<template>
  <div class="prototype-page">
    <div class="content-wrapper">
      <div class="prompt-input-section" :class="{ 'has-prompt': prompt }">
        <h3 class="prompt-generate-title">프롬프트 생성하기</h3>
        <AIPromptInput
          v-model:value="inputValue"
          @click:send-btn="onClickSendBtn"
          placeholder="유튜브 영상의 URL을 입력해주세요."
        />
      </div>
      <LoadingSpinner v-if="promptLoading" />
      <section v-if="prompt" class="prompt-section">
        <h3>생성된 프롬프트 ✦</h3>
        <p class="prompt">{{ prompt }}</p>

        <div class="thumbnail-generate-btn-wrapper">
          <button
            class="thumbnail-generate-btn"
            @click="onClickGenerateThumbnailBtn"
          >
            썸네일 생성하기
          </button>
        </div>
      </section>
      <Transition>
        <ImagePlaceholder
          v-if="thumbnailGenerateLoading || thumbnailUrl"
          width="100%"
          height="500px"
          class="image-placeholder"
        >
          <section
            v-if="thumbnailGenerateLoading"
            class="thumbnail-loading-section"
          >
            <div class="thumbnail-loading-spinner-wrapper">
              <ImgGeneratingLoadingSpinner />
            </div>

            <span class="timer">
              {{ thumbnailGenerateTimeStringValue }}
            </span>
          </section>

          <img
            v-else-if="thumbnailUrl && !thumbnailGenerateLoading"
            class="thumbnail-image"
            :src="thumbnailUrl"
            alt="thumbnail"
          />
        </ImagePlaceholder>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from "@/api/api";
import AIPromptInput from "@/components/AIPromptInput/AIPromptInput.vue";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder.vue";
import ImgGeneratingLoadingSpinner from "@/components/ImgGeneratingLoadingSpinner/ImgGeneratingLoadingSpinner.vue";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner.vue";

import { computed, ref } from "vue";

const promptLoading = ref<boolean>(false);
const thumbnailGenerateLoading = ref<boolean>(false);
const inputValue = ref<string | undefined>();
const prompt = ref<string | undefined>();
const thumbnailUrl = ref<string | undefined>();
const thumbnailGenerateTimeCounter = ref<number>(0);
const thumbnailGenerateTimeCountKey = ref<NodeJS.Timeout>();
const thumbnailGenerateTimeStringValue = computed(() => {
  const hour = thumbnailGenerateTimeCounter.value / (60 * 60);
  const minute = thumbnailGenerateTimeCounter.value / 60;
  const second = thumbnailGenerateTimeCounter.value % 60;

  const formatTime = (input: number) =>
    Math.floor(input).toString().padStart(2, "0");

  return `${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}`;
});
const startTimer = () => {
  thumbnailGenerateTimeCounter.value = 0;
  thumbnailGenerateTimeCountKey.value = setInterval(() => {
    thumbnailGenerateTimeCounter.value++;
  }, 1000);
};

const stopTimer = () => {
  clearInterval(thumbnailGenerateTimeCountKey.value);
};

const onClickSendBtn = async () => {
  prompt.value = undefined;
  thumbnailUrl.value = undefined;
  promptLoading.value = true;
  const resp = await api.post(
    "/generate_prompt",
    {},
    {
      params: {
        youtube_url: inputValue.value,
      },
    }
  );
  promptLoading.value = false;

  prompt.value = resp.data;
  console.log("prompt", resp.data);
};

const onClickGenerateThumbnailBtn = async () => {
  thumbnailGenerateLoading.value = true;
  startTimer();
  const resp = await api.post(
    "/flux_lora",
    {},
    {
      responseType: "blob",
      params: {
        lora_name: "Donald-Trump_Flux_v01e08.safetensors",
        generate_prompt: prompt.value,
      },
      headers: {
        "Content-Type": "image/png",
      },
    }
  );

  thumbnailGenerateLoading.value = false;
  stopTimer();
  const thumbnailBlob = resp.data;
  thumbnailUrl.value = URL.createObjectURL(thumbnailBlob);
};
</script>

<style scoped lang="scss">
@use "@/style/animation.scss";

.prototype-page {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  .content-wrapper {
    padding-top: 20px;
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;

    .prompt-input-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      &.has-prompt {
        gap: 4px;
        > .prompt-generate-title {
          text-align: left;
          font-size: 16px;
          transition: all 0.2s;
        }
      }

      .prompt-generate-title {
        width: 100%;
        padding: 8px;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
      }
    }
    .prompt-section {
      width: 100%;
      background-color: var(--light-gray);
      padding: 20px 24px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;

      > h3 {
        font-weight: 700;
        padding: 4px 0;
      }

      > p {
        line-height: 180%;
        word-break: keep-all;
      }

      .thumbnail-generate-btn-wrapper {
        display: flex;
        justify-content: flex-end;

        > button {
          height: 40px;
          padding: 8px 16px;
          border-radius: 20px;
          background-color: var(--primary);
          color: var(--white);
          font-size: 16px;
          font-weight: 500;

          &:hover {
            background-color: var(--primary-hover);
          }

          &:active {
            background-color: var(--primary-active);
          }
        }
      }
    }

    .image-placeholder {
      .thumbnail-loading-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 16px;

        .thumbnail-loading-spinner-wrapper {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timer {
          color: var(--dark-gray);
          display: inline-block;
        }
      }
      .thumbnail-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
