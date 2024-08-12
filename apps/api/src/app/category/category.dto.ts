import { z } from 'zod';

export const CreateCategoryDto = z.object({
  name: z.string().min(1, 'Name is required'),
});

export const UpdateCategoryDto = z.object({
  name: z.string().min(1, 'Name is required').optional(),
});

export type CreateCategoryDto = z.infer<typeof CreateCategoryDto>;
export type UpdateCategoryDto = z.infer<typeof UpdateCategoryDto>;
