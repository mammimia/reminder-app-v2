import { z } from 'zod';
import { FolderDto } from './folder';

export enum ReminderStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
}

export const ReminderDto = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  expiresAt: z.string().optional(),
  status: z.nativeEnum(ReminderStatus),
  folder: FolderDto.optional().nullable(),
});

export const CreateReminderDto = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  expiresAt: z.string().optional(),
  folderId: z.string().optional(),
});

export const UpdateReminderDto = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  expiresAt: z.string().optional(),
  status: z.nativeEnum(ReminderStatus).optional(),
  folderId: z.string().optional(),
});

export type ReminderDto = z.infer<typeof ReminderDto>;
export type CreateReminderDto = z.infer<typeof CreateReminderDto>;
export type UpdateReminderDto = z.infer<typeof UpdateReminderDto>;
