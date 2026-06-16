import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include token
    this.client.interceptors.request.use(
      (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // GET request
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // POST request
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // PUT request
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // PATCH request
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // DELETE request
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
    return error;
  }
}

export const apiClient = new ApiClient();

// Specific API endpoint methods
export const api = {
  // Products
  products: {
    getAll: (params?: any) => apiClient.get('/products', { params }),
    getOne: (slug: string) => apiClient.get(`/products/${slug}`),
    search: (query: string) => apiClient.get('/products/search', { params: { q: query } }),
  },

  // Orders
  orders: {
    getAll: (params?: any) => apiClient.get('/orders', { params }),
    getOne: (id: string) => apiClient.get(`/orders/${id}`),
    create: (data: any) => apiClient.post('/orders', data),
    update: (id: string, data: any) => apiClient.put(`/orders/${id}`, data),
    cancel: (id: string) => apiClient.patch(`/orders/${id}/cancel`, {}),
  },

  // Cart (backend)
  cart: {
    getAll: () => apiClient.get('/cart'),
    addItem: (data: any) => apiClient.post('/cart/items', data),
    updateItem: (itemId: string, data: any) => apiClient.put(`/cart/items/${itemId}`, data),
    removeItem: (itemId: string) => apiClient.delete(`/cart/items/${itemId}`),
    clear: () => apiClient.delete('/cart'),
  },

  // Addresses
  addresses: {
    getAll: () => apiClient.get('/addresses'),
    getOne: (id: string) => apiClient.get(`/addresses/${id}`),
    create: (data: any) => apiClient.post('/addresses', data),
    update: (id: string, data: any) => apiClient.put(`/addresses/${id}`, data),
    delete: (id: string) => apiClient.delete(`/addresses/${id}`),
    setDefault: (id: string) => apiClient.patch(`/addresses/${id}/default`, {}),
  },

  // Auth
  auth: {
    verifyOtp: (data: any) => apiClient.post('/auth/verify-otp', data),
    register: (data: any) => apiClient.post('/auth/register', data),
    refreshToken: () => apiClient.post('/auth/refresh-token', {}),
    logout: () => apiClient.post('/auth/logout', {}),
  },

  // Users
  users: {
    getMe: () => apiClient.get('/users/me'),
    updateMe: (data: any) => apiClient.put('/users/me', data),
    changePassword: (data: any) => apiClient.post('/users/change-password', data),
  },

  // Notifications
  notifications: {
    getAll: () => apiClient.get('/notifications'),
    markAsRead: (id: string) => apiClient.patch(`/notifications/${id}/read`, {}),
    markAllAsRead: () => apiClient.patch('/notifications/read-all', {}),
    delete: (id: string) => apiClient.delete(`/notifications/${id}`),
  },

  // Scent Profile
  scentProfile: {
    get: () => apiClient.get('/scent-profile'),
    create: (data: any) => apiClient.post('/scent-profile', data),
    update: (data: any) => apiClient.put('/scent-profile', data),
    delete: () => apiClient.delete('/scent-profile'),
  },

  // Payments
  payments: {
    createPayme: (data: any) => apiClient.post('/payments/payme/create', data),
    createClick: (data: any) => apiClient.post('/payments/click/create', data),
    getStatus: (transactionId: string) => apiClient.get(`/payments/${transactionId}/status`),
    cancel: (transactionId: string) => apiClient.post(`/payments/${transactionId}/cancel`, {}),
  },
};

export default apiClient;
