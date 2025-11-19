import { create } from "zustand";
import axiosInstance from '../axios/axiosInstance'; // adjust path as needed
import { toast } from 'react-hot-toast';

/**
 * Zustand store for handling Authentication state and actions.
 * Assumes axiosInstance is configured to handle API calls, 
 * and endpoints /create-user, /login, /logout, /me are available.
 */
export const useAuthStore = create((set) => ({
  isCreatingUser: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isFetchingUser: false,
  authUser: null,
  isAuthenticated: false,
  error: null,

  createUser: async ({ name, email, password }) => {
    set({ isCreatingUser: true, error: null })
    try {
      // POST request to sign up a new user
      const res = await axiosInstance.post('/create-user', { name, email, password })
      const user = res.data.user
      // Set authentication state upon successful creation/login
      set({ isAuthenticated: true, authUser: user })
      toast.success('User created successfully')
      return { success: true }; // Added return for navigation logic
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage })
      toast.error(errorMessage)
      return { success: false }; // Added return for navigation logic
    } finally {
      set({ isCreatingUser: false })
    }
  },

  login: async ({ email, password }) => {
    set({ isLoggingIn: true, error: null })
    try {
      // POST request to log in
      const res = await axiosInstance.post('/login', { email, password })
      const user = res.data.user
      // Set authentication state upon successful login
      set({ isAuthenticated: true, authUser: user })
      toast.success('Logged in successfully')
      return { success: true }; // Added return for navigation logic
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage })
      toast.error(errorMessage)
      return { success: false }; // Added return for navigation logic
    } finally {
      set({ isLoggingIn: false })
    }
  },

  logout: async () => {
    set({ isLoggingOut: true, error: null })
    try {
      await axiosInstance.post('/logout')
      set({ isAuthenticated: false, authUser: null })
      toast.success('Logged out successfully')
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage })
      toast.error(errorMessage)
    } finally {
      set({ isLoggingOut: false })
    }
  },

  getUser: async () => {
    set({ isFetchingUser: true, error: null })
    try {
      const res = await axiosInstance.get('/me')
      const user = res.data
      set({ authUser: user, isAuthenticated: true })
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ isAuthenticated: false, authUser: null })
      // Don't show a toast for every failed 'getUser' check (e.g., initial load)
    } finally {
      set({ isFetchingUser: false })
    }
  },

  clearError: () => set({ error: null }),
}))
