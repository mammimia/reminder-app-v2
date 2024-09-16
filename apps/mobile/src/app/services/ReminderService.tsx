import {
  CreateReminderDto,
  ReminderDto,
  ReminderFilterDto,
  UpdateReminderDto,
} from '@mammimia/types';
import AxiosService from './AxiosService';
import { TCrudService } from './TCrudService';

const ReminderService: TCrudService<
  ReminderDto,
  CreateReminderDto,
  UpdateReminderDto
> = {
  get: async (filter?: ReminderFilterDto) =>
    AxiosService.get<ReminderDto[]>('reminders', { ...filter }),
  create: async (dto: CreateReminderDto) =>
    AxiosService.post<ReminderDto>('reminders', dto),
  update: async (id: string, reminder: UpdateReminderDto) =>
    AxiosService.put<ReminderDto>(`reminders/${id}`, reminder),
  remove: async (id: string) =>
    AxiosService.delete<ReminderDto>(`reminders/${id}`),
};

export default ReminderService;
