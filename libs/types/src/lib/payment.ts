import { z } from 'zod';

export enum PaymentPeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  ONE_TIME = 'ONE_TIME',
}

export const PaymentDto = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  period: z.nativeEnum(PaymentPeriod),
});

export const CreatePaymentDto = z.object({
  name: z.string(),
  color: z.string(),
  period: z.nativeEnum(PaymentPeriod),
});

export const UpdatePaymentDto = z.object({
  name: z.string(),
  color: z.string(),
  period: z.nativeEnum(PaymentPeriod),
});

export type PaymentDto = z.infer<typeof PaymentDto>;
export type CreatePaymentDto = z.infer<typeof CreatePaymentDto>;
export type UpdatePaymentDto = z.infer<typeof UpdatePaymentDto>;
