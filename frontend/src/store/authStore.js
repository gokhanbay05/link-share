import { create } from "zustand";
import api from "../api/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,

  checkAuth: async () => {
    try {
      const response = await api.get("/profile/me");
      set({ user: response.data, isLoading: false });
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/auth/login", { email, password });
      set({ user: response.data, isLoading: false });
    } catch (error) {
      set({ user: null, isLoading: false });
      throw error;
    }
  },

  register: async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      set({ user: response.data, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },

  updateBio: async (newBio) => {
    try {
      const response = await api.put("/profile/me", { bio: newBio });

      set({ user: response.data });
      toast.success("Bio updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update bio.");
    }
  },

  updateAvatar: async (avatarFile) => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const toastId = toast.loading("Uploading avatar...");

    try {
      const response = await api.put("/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({ user: response.data });
      toast.success("Avatar updated!", { id: toastId });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload avatar.", {
        id: toastId,
      });
    }
  },
}));

export default useAuthStore;
