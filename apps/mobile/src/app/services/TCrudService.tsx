import { AxiosResponse } from 'axios';

export type TCrudService<T, CreateDto, UpdateDto, FilterDto = void> = {
  get: (filterDto?: FilterDto) => Promise<AxiosResponse<T[]>>;
  create: (dto: CreateDto) => Promise<AxiosResponse<T>>;
  update: (id: string, dto: UpdateDto) => Promise<AxiosResponse<T>>;
  remove: (id: string) => Promise<AxiosResponse<T>>;
};
