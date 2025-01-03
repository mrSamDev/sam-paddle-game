import ky from "ky";
import { base } from "../constants/config";
import { useAuthStore } from "../store/authentication";

const getToken = () => {
  const token = useAuthStore.getState().token;
  if (!token) return "";
  return `Bearer ${token}`;
};

const api = ky.create({
  prefixUrl: base.API_BASE_URL + "/",
  retry: 0,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Authorization", getToken());
      },
    ],
  },
});

export default api;
