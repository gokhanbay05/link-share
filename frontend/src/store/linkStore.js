import { create } from "zustand";
import api from "../api/axios";
import toast from "react-hot-toast";

const useLinkStore = create((set, get) => ({
  links: [],
  isLoading: false,

  fetchLinks: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/links");
      set({ links: response.data, isLoading: false });
    } catch (error) {
      toast.error("Links could not be fetched.");
      set({ isLoading: false });
    }
  },

  addLink: async (title, url) => {
    try {
      const response = await api.post("/links", { title, url });
      set((state) => ({
        links: [...state.links, response.data],
      }));
      toast.success("Link added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add link.");
      throw error;
    }
  },

  deleteLink: async (linkId) => {
    const previousLinks = get().links;
    set((state) => ({
      links: state.links.filter((link) => link._id !== linkId),
    }));

    try {
      await api.delete(`/links/${linkId}`);
      toast.success("Link deleted.");
    } catch (error) {
      toast.error("Failed to delete link.");
      set({ links: previousLinks });
    }
  },

  updateLink: async (linkId, title, url) => {
    try {
      const response = await api.put(`/links/${linkId}`, { title, url });
      set((state) => ({
        links: state.links.map((link) =>
          link._id === linkId ? response.data : link
        ),
      }));
      toast.success("Link updated!");
    } catch (error) {
      toast.error("Failed to update link.");
    }
  },

  reorderLinks: async (orderedLinks) => {
    const previousLinks = get().links;
    set({ links: orderedLinks });

    const orderedIds = orderedLinks.map((link) => link._id);

    try {
      await api.put("/links/reorder", { orderedIds });
    } catch (error) {
      toast.error("Failed to reorder links.");
      set({ links: previousLinks });
    }
  },
}));

export default useLinkStore;
