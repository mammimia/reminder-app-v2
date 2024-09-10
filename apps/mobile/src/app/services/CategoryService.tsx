import {
  CreateCategoryDto,
  CategoryDto,
  UpdateCategoryDto,
} from '@mammimia/types';
import AxiosService from './AxiosService';
import { TCrudService } from './TCrudService';

const CategoryService: TCrudService<
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto
> = {
  get: async () => AxiosService.get<CategoryDto[]>('categories'),
  create: async (dto: CreateCategoryDto) =>
    AxiosService.post<CategoryDto>('categories', dto),
  update: async (id: string, category: UpdateCategoryDto) =>
    AxiosService.put<CategoryDto>(`categories/${id}`, category),
  remove: async (id: string) =>
    AxiosService.delete<CategoryDto>(`categories/${id}`),
};

export default CategoryService;
