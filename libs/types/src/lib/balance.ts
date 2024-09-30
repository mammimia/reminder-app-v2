import { z } from 'zod';

export enum Currency {
  TL = 'TL',
  USD = 'USD',
}

export const BalanceDto = z.object({
  id: z.string(),
  amount: z.number(),
  currency: z.nativeEnum(Currency),
});

export const CreateBalanceDto = z.object({
  amount: z.number(),
  currency: z.nativeEnum(Currency).default(Currency.TL),
});

export const ChangeBalanceDto = z.object({
  amount: z.number(),
});

export type BalanceDto = z.infer<typeof BalanceDto>;
export type CreateBalanceDto = z.infer<typeof CreateBalanceDto>;
export type ChangeBalanceDto = z.infer<typeof ChangeBalanceDto>;
