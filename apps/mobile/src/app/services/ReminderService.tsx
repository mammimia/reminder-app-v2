import {
  CreateReminderDto,
  ReminderDto,
  ReminderFilterDto,
  UpdateReminderDto,
} from '@mammimia/types';
import AxiosService from './AxiosService';

const get = async (params?: ReminderFilterDto) =>
  AxiosService.get<ReminderDto[]>('reminders', params);
const create = async (reminder: CreateReminderDto) =>
  AxiosService.post<ReminderDto>('reminders', reminder);
const update = async (id: string, reminder: UpdateReminderDto) =>
  AxiosService.put<ReminderDto>(`reminders/${id}`, reminder);
const remove = async (id: string) =>
  AxiosService.delete<ReminderDto>(`reminders/${id}`);

export default {
  get,
  create,
  update,
  remove,
};
