import { z } from 'zod';
import { PaymentDto } from './payment';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
}

export const TransactionDto = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  amount: z.number(),
  type: z.nativeEnum(TransactionType),
  date: z.string(),
  paymentMethod: z.nativeEnum(PaymentMethod),
  payment: PaymentDto.optional().nullable(),
});

export const CreateTransactionDto = z.object({
  title: z.string(),
  description: z.string().optional(),
  amount: z.number(),
  type: z.nativeEnum(TransactionType).default(TransactionType.EXPENSE),
  date: z.string().default(new Date().toISOString()),
  paymentMethod: z.nativeEnum(PaymentMethod).default(PaymentMethod.CASH),
  paymentId: z.string(),
});

export const UpdateTransactionDto = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  amount: z.number().optional(),
  type: z.nativeEnum(TransactionType).optional(),
  date: z.string().optional(),
  paymentMethod: z.nativeEnum(PaymentMethod).optional(),
  paymentId: z.string().optional(),
});

export type TransactionDto = z.infer<typeof TransactionDto>;
export type CreateTransactionDto = z.infer<typeof CreateTransactionDto>;
export type UpdateTransactionDto = z.infer<typeof UpdateTransactionDto>;
