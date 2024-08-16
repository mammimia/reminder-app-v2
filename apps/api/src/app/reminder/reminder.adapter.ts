import { ReminderDto } from '@mammimia/types';
import { Reminder } from '@prisma/client';
import { FolderAdapter, FolderWithCategory } from '../folder/folder.adapter';

export type ReminderWithFolder = Reminder & {
  folder?: FolderWithCategory | null;
};

const toDto = (reminder: ReminderWithFolder): ReminderDto => {
  const dto = {
    id: reminder.id,
    title: reminder.title,
    content: reminder.content,
    expiresAt: reminder.expiresAt?.toISOString(),
    status: reminder.status,
    folder: reminder.folder ? FolderAdapter.toDto(reminder.folder) : null,
  };

  return ReminderDto.parse(dto);
};

const toDtoArray = (reminders: ReminderWithFolder[]): ReminderDto[] => {
  return reminders.map((reminder) => toDto(reminder));
};

export const ReminderAdapter = {
  toDto,
  toDtoArray,
};
