<template>
  <div class="prototype-page">
    <button class="side-drawer-open-btn" @click="isDrawerOpen = true">
      <span class="open-btn-text">학습된 영상 보기</span>
    </button>
    <div class="content-wrapper">
      <ImagePlaceholder width="100%" height="500px" class="image-placeholder">
        <span class="placeholder-content">
          <span class="star-icon" :class="{ 'blink-animation': !inputValue }">
            ✦
          </span>
          프롬프트를 통해 썸네일을 생성해보세요 ✦
        </span>
      </ImagePlaceholder>
      <AIPromptInput v-model:value="inputValue" />
    </div>
  </div>

  <Teleport to="body">
    <SideDrawer class="side-drawer" :class="[isDrawerOpen ? 'open' : 'close']">
      <div class="side-drawer-header">
        <button class="side-drawer-close-btn" @click="isDrawerOpen = false">
          <span class="arrow"> 》 </span>
        </button>
      </div>
      <ul class="video-summaries-ul">
        <li v-for="videoSummary in mockVideoSummaries" :key="videoSummary.id">
          <VideoSummaryItem
            :img-url="videoSummary.title"
            :title="videoSummary.title"
            :length="videoSummary.videoLength"
          />
        </li>
      </ul>
    </SideDrawer>
  </Teleport>
</template>

<script setup lang="ts">
import AIPromptInput from "@/components/AIPromptInput/AIPromptInput.vue";
import ImagePlaceholder from "@/components/ImagePlaceholder/ImagePlaceholder.vue";
import SideDrawer from "@/components/SideDrawer/SideDrawer.vue";
import VideoSummaryItem from "@/components/VideoSummaryItem/VideoSummaryItem.vue";

import { ref } from "vue";

const mockVideoSummaries = Array(10)
  .fill(0)
  .map((_, idx) => ({
    id: "id" + idx,
    title: "[Title] 영상 제목" + idx,
    videoLength: "00:00:00",
  }));

const inputValue = ref<string | undefined>();

const isDrawerOpen = ref<boolean>(false);
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

  .side-drawer-open-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    gap: 4px;

    padding: 8px;
    height: 40px;
    border-radius: 4px;

    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: var(--dark-gray);

    &:hover {
      background-color: var(--light-gray);
    }
  }

  .content-wrapper {
    padding-top: 20px;
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;

    .image-placeholder {
      .placeholder-content {
        display: flex;
        flex-direction: column;
        gap: 40px;
        align-items: center;

        color: var(--dark-gray);

        font-size: 16px;
        font-weight: 500;

        .star-icon {
          font-size: 60px;
          color: var(--primary);
          @include animation.inline-animation(2.2s, infinite) {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
            100% {
              opacity: 1;
            }
          }
        }
      }
    }
  }
}

.arrow {
  font-size: 24px;
  padding: 2px 4px 0 4px;

  font-weight: 500;
}

.side-drawer {
  position: fixed;
  top: 60px;
  height: calc(100vh - 60px);
  right: 0;
  background-color: var(--white);
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  padding: 20px 8px;

  .side-drawer-header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .side-drawer-close-btn {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      text-align: center;
      padding: 4px;
      color: var(--dark-gray);
      &:hover {
        background-color: var(--light-gray);
      }
    }
  }

  &.open {
    transform: translateX(0);
  }

  &.close {
    transform: translateX(100%);
  }

  .video-summaries-ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 8px 16px;
    overflow-y: auto;
    height: calc(100% - 80px);
  }
}
</style>
