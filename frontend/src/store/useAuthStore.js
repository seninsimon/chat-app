import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,

  isSigningUp: false,

  isLoggingIn: false,

  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");

      console.log(response);

      set({ authUser: response.data });
    } catch (error) {
      console.log("error in checkauth");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      console.log(data);

      const response = await axiosInstance.post("/auth/signup", data);

      console.log(response);

      set({ authUser: response.data });

      toast.success("account created successfully");
    } catch (error) {
      toast.error("error in singing up");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);

      console.log(response);
      set({ authUser: response.data });

      toast.success("user logged in successfully");
    } catch (error) {
      toast.error("error in logging in ");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      set({ authUser: null });

      const response = await axiosInstance.post("/auth/logout");

      console.log(response);

      toast.success("user logged out successfully");
    } catch (error) {
      toast.error("error in logging out");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error("error in updating the profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
