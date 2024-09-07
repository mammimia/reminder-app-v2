import {
  CreateCategoryDto,
  CategoryDto,
  UpdateCategoryDto,
} from '@mammimia/types';
import AxiosService from './AxiosService';

const get = async () => AxiosService.get<CategoryDto[]>('categories');
const create = async (reminder: CreateCategoryDto) =>
  AxiosService.post<CategoryDto>('categories', reminder);
const update = async (id: string, reminder: UpdateCategoryDto) =>
  AxiosService.put<CategoryDto>(`categories/${id}`, reminder);
const remove = async (id: string) =>
  AxiosService.delete<CategoryDto>(`categories/${id}`);

export default {
  get,
  create,
  update,
  remove,
};
