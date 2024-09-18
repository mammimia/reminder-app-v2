import {
  CreateFolderDto,
  FilterFolderDto,
  FolderDto,
  UpdateFolderDto,
} from '@mammimia/types';
import AxiosService from './AxiosService';
import { TCrudService } from './TCrudService';

const FolderService: TCrudService<
  FolderDto,
  CreateFolderDto,
  UpdateFolderDto,
  FilterFolderDto
> = {
  get: async (filter?: FilterFolderDto) =>
    AxiosService.get<FolderDto[]>('folders', { ...filter }),
  create: async (dto: CreateFolderDto) =>
    AxiosService.post<FolderDto>('folders', dto),
  update: async (id: string, folder: UpdateFolderDto) =>
    AxiosService.put<FolderDto>(`folders/${id}`, folder),
  remove: async (id: string) => AxiosService.delete<FolderDto>(`folders/${id}`),
};

export default FolderService;
