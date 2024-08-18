import { z } from 'zod';

export const SortOrder = z.enum(['asc', 'desc']);

export const PaginationDto = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: SortOrder.optional(),
});

export type PaginationDto = z.infer<typeof PaginationDto>;
export type SortOrder = z.infer<typeof SortOrder>;
