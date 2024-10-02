import { TransactionDto } from '@mammimia/types';
import { PaymentType, Transaction } from '@prisma/client';
import { PaymentTypeAdapter } from '../payment-type/payment-type.adapter';

export type TransactionWithPayment = Transaction & {
  paymentType?: PaymentType | null;
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
    payment: transaction.paymentType
      ? PaymentTypeAdapter.toDto(transaction.paymentType)
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
