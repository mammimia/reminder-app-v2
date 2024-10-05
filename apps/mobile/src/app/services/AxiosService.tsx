import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL, API_ANDROID_BASE_URL } from '@env';
import { Platform } from 'react-native';

interface CustomError {
  status: number;
  message: string;
}

class AxiosService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: Platform.OS === 'android' ? API_ANDROID_BASE_URL : API_BASE_URL,
      timeout: 10000, // 10 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.apiClient.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const customError: CustomError = {
          status: error.response?.status ?? 500,
          message:
            (error.response?.data as { message?: string })?.message ||
            'Something went wrong. Please try again.',
        };
        return Promise.reject(customError);
      }
    );
  }

  get<T>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    return this.apiClient.get<T>(url, { params });
  }

  post<T>(
    url: string,
    data?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    return this.apiClient.post<T>(url, data);
  }

  put<T>(
    url: string,
    data?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    return this.apiClient.put<T>(url, data);
  }

  delete<T>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    return this.apiClient.delete<T>(url, { params });
  }

  patch<T>(
    url: string,
    data?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    return this.apiClient.patch<T>(url, data);
  }
}

export default new AxiosService();
