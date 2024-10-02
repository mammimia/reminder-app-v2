import { z } from 'zod';

export enum PaymentPeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  ONE_TIME = 'ONE_TIME',
}

export const PaymentTypeDto = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  period: z.nativeEnum(PaymentPeriod),
});

export const CreatePaymentTypeDto = z.object({
  name: z.string(),
  color: z.string(),
  period: z.nativeEnum(PaymentPeriod),
});

export const UpdatePaymentTypeDto = z.object({
  name: z.string(),
  color: z.string(),
  period: z.nativeEnum(PaymentPeriod),
});

export type PaymentTypeDto = z.infer<typeof PaymentTypeDto>;
export type CreatePaymentTypeDto = z.infer<typeof CreatePaymentTypeDto>;
export type UpdatePaymentTypeDto = z.infer<typeof UpdatePaymentTypeDto>;
