import {
  CreateReminderDto,
  ReminderDto,
  ReminderFilterDto,
  UpdateReminderDto,
} from '@mammimia/types';
import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';
import { TCrudService } from './TCrudService';

const ReminderService: TCrudService<
  ReminderDto,
  CreateReminderDto,
  UpdateReminderDto,
  ReminderFilterDto
> & {
  getToday: (
    filter?: ReminderFilterDto
  ) => Promise<AxiosResponse<ReminderDto[]>>;
} = {
  get: async (filter?: ReminderFilterDto) =>
    AxiosService.get<ReminderDto[]>('reminders', { ...filter }),
  getToday: async (filter?: ReminderFilterDto) =>
    AxiosService.get<ReminderDto[]>('reminders/today', { ...filter }),
  create: async (dto: CreateReminderDto) =>
    AxiosService.post<ReminderDto>('reminders', dto),
  update: async (id: string, reminder: UpdateReminderDto) =>
    AxiosService.put<ReminderDto>(`reminders/${id}`, reminder),
  remove: async (id: string) =>
    AxiosService.delete<ReminderDto>(`reminders/${id}`),
};

export default ReminderService;
