import { z } from 'zod';
import { CategoryDto } from './category';

export const FolderDto = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string().optional(),
  category: CategoryDto.optional().nullable(),
  reminderCount: z.number().optional(),
});

export const CreateFolderDto = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().length(7, "Color must be in '#000000' format").optional(),
  categoryId: z.string().optional(),
});

export const UpdateFolderDto = z.object({
  name: z.string().optional(),
  color: z.string().length(7, "Color must be in '#000000' format").optional(),
  categoryId: z.string().optional(),
});

export type FolderDto = z.infer<typeof FolderDto>;
export type CreateFolderDto = z.infer<typeof CreateFolderDto>;
export type UpdateFolderDto = z.infer<typeof UpdateFolderDto>;
