/* eslint-disable consistent-return */
import axios from 'axios';
import { axiosErrorHandler } from './ErrorHandler';

class HttpApi {
  api;

  constructor(config: any, responseInterceptor: any) {
    this.api = axios.create(config);
    // Add a response interceptor
    this.api.interceptors.response.use(responseInterceptor);
  }

  setAuthHeader = (authToken: string) => {
    this.api.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  };

  removeAuthHeader = () => {
    delete this.api.defaults.headers.common.Authorization;
  };

  get = async (uri: string, params?: any) => {
    try {
      const result = await this.api.get(uri, {
        params,
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  post = async (uri: string, body?: any, params?: any) => {
    try {
      const result = await this.api.post(uri, body, {
        params,
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  postFile = async (uri: string, body: any, options?: any, params?: any) => {
    try {
      const result = await this.api.post(uri, body, {
        params,
        ...options,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  putFile = async (uri: string, file: any, params?: any) => {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      const result = await this.api.put(uri, formData, {
        params,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  put = async (uri: string, body?: any, params?: any) => {
    try {
      const result = await this.api.put(uri, body, {
        params,
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  delete = async (uri: string, params?: any) => {
    try {
      const result = await this.api.delete(uri, {
        params,
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  patch = async (uri: string, body?: any, params?: any) => {
    try {
      const result = await this.api.patch(uri, body, {
        params,
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };
}

export const backendAPI = new HttpApi(
  {
    baseURL: process.env.END_POINT,
    timeout: 25000,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  (response?: any) => ({
    ...response,
    data: { content: response.data, statusHttp: response.status },
  }),
);

export const uploadAPI = new HttpApi(
  {
    baseURL: process.env.END_POINT,
    timeout: 25000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
  (response?: any) => ({
    ...response,
    data: { content: response.data, statusHttp: response.status },
  }),
);
