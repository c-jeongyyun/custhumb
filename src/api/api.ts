import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  headers: {
    "Access-Control-Allow-Origin": window.location.origin,
    "Access-Control-Allow-Credentials": "true",
  },
});
