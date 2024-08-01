import ApiClient from '../ApiClient';
import {CategoriesResponse} from '../types/categories';

export const categoryServices = async (): Promise<CategoriesResponse> => {
  try {
    const response: CategoriesResponse = await ApiClient.get(
      '/products/categories',
    );
    return response;
  } catch (error) {
    throw error;
  }
};
