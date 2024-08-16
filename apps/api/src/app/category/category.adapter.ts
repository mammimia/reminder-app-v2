import { CategoryDto } from '@mammimia/types';
import { Category } from '@prisma/client';

const toDto = (category: Category): CategoryDto => {
  const dto = {
    id: category.id,
    name: category.name,
  };

  return CategoryDto.parse(dto);
};

const toDtoArray = (categories: Category[]): CategoryDto[] => {
  return categories.map((category) => toDto(category));
};

export const CategoryAdapter = {
  toDto,
  toDtoArray,
};
