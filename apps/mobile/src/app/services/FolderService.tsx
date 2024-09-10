import { CreateFolderDto, FolderDto, UpdateFolderDto } from '@mammimia/types';
import AxiosService from './AxiosService';
import { TCrudService } from './TCrudService';

const FolderService: TCrudService<FolderDto, CreateFolderDto, UpdateFolderDto> =
  {
    get: async () => AxiosService.get<FolderDto[]>('folders'),
    create: async (dto: CreateFolderDto) =>
      AxiosService.post<FolderDto>('folders', dto),
    update: async (id: string, folder: UpdateFolderDto) =>
      AxiosService.put<FolderDto>(`folders/${id}`, folder),
    remove: async (id: string) =>
      AxiosService.delete<FolderDto>(`folders/${id}`),
  };

export default FolderService;
