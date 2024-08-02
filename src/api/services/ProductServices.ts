import ApiClient from '../ApiClient';
import {
  ProductByIdResponse,
  ProductParams,
  ProductResponse,
} from '../types/product';

export const productServices = async (
  params: ProductParams,
): Promise<ProductResponse> => {
  try {
    const response: ProductResponse = await ApiClient.get('/products', {
      params,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const productSearchServices = async (
  params: ProductParams,
): Promise<ProductResponse> => {
  try {
    const response: ProductResponse = await ApiClient.get('/products/search', {
      params,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const productByCategoryServices = async (
  category: string,
  params: ProductParams,
): Promise<ProductResponse> => {
  try {
    const response: ProductResponse = await ApiClient.get(
      `/products/category/${category}`,
      {
        params,
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const productByIdServices = async (
  id: string,
): Promise<ProductByIdResponse> => {
  try {
    const response: ProductByIdResponse = await ApiClient.get(
      `/products/${id}`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};
