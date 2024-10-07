import { BalanceDto, Currency } from '@mammimia/types';

const calculateTotalBalance = (balances: BalanceDto[], rate: number) => {
  const totalBalance = balances.reduce((acc, balance) => {
    if (balance.currency === Currency.TL) {
      return acc + balance.amount;
    }

    if (balance.currency === Currency.USD) {
      return acc + balance.amount * rate;
    }

    return acc;
  }, 0);

  return totalBalance;
};

const format = (amount: number, currency: Currency) => {
  if (currency === Currency.TL) {
    return amount.toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    });
  }

  if (currency === Currency.USD) {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default { calculateTotalBalance, format };
