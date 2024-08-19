import {
  DEFAULT_SORT_ORDER,
  PAGE_SIZE,
  PaginationDto,
  SortOrder,
} from '@mammimia/types';
import { ZodSchema } from 'zod';

type PrismaQueryOptions<T> = {
  where: Partial<Record<keyof T, any>>;
  take?: number;
  skip?: number;
  orderBy?: { [x: string]: SortOrder }; // TODO: This should be keyof T
};

const fillWhereCondition = <T>(
  parsedFilter: T
): Partial<Record<keyof T, any>> => {
  const where: PrismaQueryOptions<T>['where'] = {};

  if (!parsedFilter || typeof parsedFilter !== 'object') {
    return where;
  }

  Object.entries(parsedFilter).forEach(([key, value]) => {
    if (value == null) {
      return;
    }
    if (typeof value === 'string') {
      where[key as keyof T] = { contains: value, mode: 'insensitive' };
    } else {
      where[key as keyof T] = value;
    }
  });

  return where;
};

export const buildQueryOptions = <T>(
  filterDto: T,
  schema: ZodSchema<T>
): PrismaQueryOptions<T> => {
  const parsedFilter = schema.parse(filterDto);

  const where = fillWhereCondition(parsedFilter);

  return { where };
};

export const buildQueryOptionsWithPagination = <T>(
  filterDto: T & PaginationDto,
  schema: ZodSchema<PaginationDto> & ZodSchema<T>
): PrismaQueryOptions<T> => {
  const { limit, page, sortBy, sortOrder, ...filters } =
    schema.parse(filterDto);

  const where = fillWhereCondition(filters);

  const take = Number(limit ?? PAGE_SIZE);
  const skip = page ? Number(page) * take ?? PAGE_SIZE : 0;

  let orderBy = undefined;

  if (sortBy) {
    orderBy = {
      [sortBy as keyof T]: sortOrder ?? DEFAULT_SORT_ORDER,
    };
  }

  return { where, take, skip, orderBy };
};

export const prismaUtils = {
  buildQueryOptions,
  buildQueryOptionsWithPagination,
};
