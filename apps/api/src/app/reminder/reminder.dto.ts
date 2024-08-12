import { ReminderStatus } from '@prisma/client';
import { z } from 'zod';

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

export type CreateReminderDto = z.infer<typeof CreateReminderDto>;
export type UpdateReminderDto = z.infer<typeof UpdateReminderDto>;
