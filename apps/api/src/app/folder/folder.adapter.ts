import { FolderDto } from '@mammimia/types';
import { Category, Folder } from '@prisma/client';
import { CategoryAdapter } from '../category/category.adapter';

export type FolderWithCategory = Folder & {
  category?: Category | null;
};

const toDto = (folder: FolderWithCategory): FolderDto => {
  const dto = {
    id: folder.id,
    name: folder.name,
    color: folder.color,
    category: folder.category ? CategoryAdapter.toDto(folder.category) : null,
  };

  return FolderDto.parse(dto);
};

const toDtoArray = (folders: FolderWithCategory[]): FolderDto[] => {
  return folders.map((folder) => toDto(folder));
};

export const FolderAdapter = {
  toDto,
  toDtoArray,
};
