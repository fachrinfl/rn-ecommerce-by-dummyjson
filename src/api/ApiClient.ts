import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
} from 'axios';
import {configs} from '../constants/configs';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

const onRequest = async (
  config: AdaptAxiosRequestConfig,
): Promise<AdaptAxiosRequestConfig> => {
  return config;
};

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response.data;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error.response?.data);
};

const setupInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

const ApiClient = setupInterceptors(
  Axios.create({
    baseURL: configs.baseURL,
    timeout: 60000,
  }),
);

export default ApiClient;
