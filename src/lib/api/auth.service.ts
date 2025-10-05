// lib/api/auth.service.ts - FOR COOKIE-BASED AUTH

import { apiClient } from "./client";

// === INTERFACES ===
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string | undefined;
  role?: "STUDENT" | "INSTRUCTOR" | undefined;
  bio?: string | undefined;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  isEmailVerified: boolean;
  profilePicture?: string;
}

export interface AuthResponse {
  user: UserData;
  // Note: Tokens are in cookies, not in response body
}

export interface VerifyEmailPayload {
  id: string;
  token: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  id: string;
  token: string;
  oldPassword: string;
  newPassword: string;
}

// === AUTH SERVICE ===
export const authService = {
  // Current user data (cached in memory)
  currentUser: null as UserData | null,

  // Register new user
  async register(payload: RegisterPayload) {
    const response = await apiClient.post<AuthResponse>("/auth/register", payload);

    if (response.success && response.data) {
      // Store user data in memory
      this.currentUser = response.data.user;

      // Cookies are automatically set by backend
      // No need to manually store tokens!
    }

    return response;
  },

  // Login user
  async login(payload: LoginPayload) {
    const response = await apiClient.post<AuthResponse>("/auth/login", payload);

    if (response.success && response.data) {
      // Store user data in memory
      this.currentUser = response.data.user;

      // Cookies are automatically set by backend
    }

    return response;
  },

  // Google OAuth login
  async googleAuth(payload: {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  }) {
    const response = await apiClient.post<AuthResponse>("/auth/google", payload);

    if (response.success && response.data) {
      this.currentUser = response.data.user;
    }

    return response;
  },

  // Logout
  async logout() {
    // Call backend to clear cookies
    await apiClient.post("/auth/logout");

    // Clear cached user data
    this.currentUser = null;
  },

  // Logout from all devices
  async logoutAllDevices() {
    if (this.currentUser) {
      await apiClient.post("/auth/logout-all", {
        email: this.currentUser.email,
      });
    }

    this.currentUser = null;
  },

  // Refresh access token (automatic via cookies)
  async refreshToken() {
    const response = await apiClient.post<AuthResponse>("/auth/refresh");

    // Backend automatically refreshes cookies
    // Just update user data if returned
    if (response.success && response.data) {
      this.currentUser = response.data.user;
    }

    return response;
  },

  // Verify email
  async verifyEmail(payload: VerifyEmailPayload) {
    return await apiClient.post("/auth/verify", payload);
  },

  // Forgot password
  async forgotPassword(payload: ForgotPasswordPayload) {
    return await apiClient.post("/auth/forgot-password", payload);
  },

  // Reset password
  async resetPassword(payload: ResetPasswordPayload) {
    return await apiClient.post(`/auth/reset-password?id=${payload.id}&token=${payload.token}`, {
      oldPassword: payload.oldPassword,
      newPassword: payload.newPassword,
    });
  },

  // Get current user (from cache or fetch from backend)
  async getCurrentUser(): Promise<UserData | null> {
    // Return cached user if available
    if (this.currentUser) {
      return this.currentUser;
    }

    // Fetch from backend using cookie authentication
    try {
      const response = await apiClient.get<{ user: UserData }>("/auth/me");

      if (response.success && response.data) {
        this.currentUser = response.data.user;
        return this.currentUser;
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    }

    return null;
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    // Try to get current user
    const user = await this.getCurrentUser();
    return user !== null;
  },

  // Clear cached user data (call this on app load if needed)
  clearCache() {
    this.currentUser = null;
  },
};
