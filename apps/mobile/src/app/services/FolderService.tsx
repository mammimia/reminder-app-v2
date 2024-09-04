import { CreateFolderDto, FolderDto, UpdateFolderDto } from '@mammimia/types';
import AxiosService from './AxiosService';

const get = async () => AxiosService.get<FolderDto[]>('folders');
const create = async (reminder: CreateFolderDto) =>
  AxiosService.post<FolderDto>('folders', reminder);
const update = async (id: string, reminder: UpdateFolderDto) =>
  AxiosService.put<FolderDto>(`folders/${id}`, reminder);
const remove = async (id: string) =>
  AxiosService.delete<FolderDto>(`folders/${id}`);

export default {
  get,
  create,
  update,
  remove,
};
