import axios from "axios";
import { ProfileUserType } from "../redux/store";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "851ccd71-58c3-4f92-b794-f803a4080a69",
  },
});

export const usersAPI = {
  fetchUsers: (page: number, pageSize: number) => {
    return instance.get(`users?page=${page}&count=${pageSize}`);
  },
  follow: async (id: number) => {
    try {
      const response = await instance.post(`follow/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  unFollow: async (id: number) => {
    try {
      const response = await instance.delete(`follow/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export const profileAPI = {
  getProfile(id: string) {
    return instance.get(`profile/` + id);
  },
  getStatus(userId: string) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put("profile/status", { status });
  },
  updatePhoto(photo: File) {
    const formData = new FormData();
    formData.append("image", photo);
    return instance.put("profile/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateProfile(profile: ProfileUserType) {
    return instance.put("profile", profile);
  },
};

export const loginApi = {
  login(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
    return instance.post("auth/login", { email, password, rememberMe, captcha });
  },
  logout() {
    return instance.delete("auth/login");
  },
};

export const authApi = {
  auth() {
    return instance.get("auth/me");
  },
};

export const settingApi = {
  captcha() {
    return instance.get("security/get-captcha-url");
  },
};
