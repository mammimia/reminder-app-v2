import { BalanceDto } from '@mammimia/types';
import { Balance } from '@prisma/client';

const toDto = (balance: Balance): BalanceDto => {
  const dto = {
    id: balance.id,
    amount: balance.amount,
    currency: balance.currency,
  };

  return BalanceDto.parse(dto);
};

const toDtoArray = (balances: Balance[]): BalanceDto[] => {
  return balances.map((balance) => toDto(balance));
};

export const BalanceAdapter = {
  toDto,
  toDtoArray,
};
