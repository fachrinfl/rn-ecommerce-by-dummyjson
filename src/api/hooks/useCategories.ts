import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {CategoriesResponse} from '../types/categories';
import {categoryServices} from '../services/CategoryServices';
import {getQueryKey} from '../types/query';

export const useCategories = (): UseQueryResult<CategoriesResponse, Error> =>
  useQuery({
    queryKey: getQueryKey('categories'),
    queryFn: () => categoryServices(),
  });
