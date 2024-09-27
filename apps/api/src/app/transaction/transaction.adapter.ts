import { TransactionDto } from '@mammimia/types';
import { Payment, Transaction } from '@prisma/client';
import { PaymentAdapter } from '../payment/payment.adapter';

export type TransactionWithPayment = Transaction & {
  payment?: Payment | null;
};

const toDto = (transaction: TransactionWithPayment): TransactionDto => {
  const dto = {
    id: transaction.id,
    title: transaction.title,
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    date: transaction.date?.toISOString(),
    paymentMethod: transaction.paymentMethod,
    payment: transaction.payment
      ? PaymentAdapter.toDto(transaction.payment)
      : null,
  };

  return TransactionDto.parse(dto);
};

const toDtoArray = (
  transactions: TransactionWithPayment[]
): TransactionDto[] => {
  return transactions.map((transaction) => toDto(transaction));
};

export const TransactionAdapter = {
  toDto,
  toDtoArray,
};
