const API_BASE_URL = process.env["BACKEND_API_URL"] || "http://localhost:5000/api/v1";

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: unknown[];
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    try {
      // FIX: Use proper template literal
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
        credentials: "include",
      });

      const data = await response.json();

      // Handle non-2xx responses
      if (!response.ok) {
        return {
          success: false,
          message: data.message || `HTTP error! status: ${response.status}`,
          errors: data.errors,
        };
      }

      return data;
    } catch (error) {
      console.error("API request error:", error);
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "GET",
    });
  }

  // POST request
  async post<T>(
    endpoint: string,
    body?: unknown,
    customHeaders?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: customHeaders || {},
    });
  }

  // PUT request
  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export base URL
export { API_BASE_URL };
