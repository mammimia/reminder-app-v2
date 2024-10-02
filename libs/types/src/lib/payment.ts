import { z } from 'zod';
import { PaymentTypeDto } from './payment-type';
import { Currency } from './balance';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
}

export const PaymentDto = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  amount: z.number(),
  currency: z.nativeEnum(Currency),
  transactionType: z.nativeEnum(TransactionType),
  date: z.string(),
  method: z.nativeEnum(PaymentMethod),
  type: PaymentTypeDto.optional().nullable(),
});

export const CreatePaymentDto = z.object({
  title: z.string(),
  description: z.string().optional(),
  amount: z.number(),
  currency: z.nativeEnum(Currency).default(Currency.TL),
  transactionType: z
    .nativeEnum(TransactionType)
    .default(TransactionType.EXPENSE),
  date: z.string().default(new Date().toISOString()),
  method: z.nativeEnum(PaymentMethod).default(PaymentMethod.CASH),
  typeId: z.string(),
});

export const UpdatePaymentDto = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  amount: z.number().optional(),
  currency: z.nativeEnum(Currency).optional(),
  transactionType: z.nativeEnum(TransactionType).optional(),
  date: z.string().optional(),
  method: z.nativeEnum(PaymentMethod).optional(),
  typeId: z.string().optional(),
});

export type PaymentDto = z.infer<typeof PaymentDto>;
export type CreatePaymentDto = z.infer<typeof CreatePaymentDto>;
export type UpdatePaymentDto = z.infer<typeof UpdatePaymentDto>;
