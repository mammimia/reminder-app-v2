import { PaymentDto } from '@mammimia/types';
import { Payment, PaymentType } from '@prisma/client';
import { PaymentTypeAdapter } from '../payment-type/payment-type.adapter';

export type PaymentWithType = Payment & {
  type?: PaymentType | null;
};

const toDto = (payment: PaymentWithType): PaymentDto => {
  const dto = {
    id: payment.id,
    title: payment.title,
    description: payment.description,
    amount: payment.amount,
    currency: payment.currency,
    transactionType: payment.transactionType,
    paymentDate: payment.paymentDate?.toISOString(),
    paidDate: payment.paidDate?.toISOString(),
    isPaid: payment.paidDate !== null,
    method: payment.method,
    type: payment.type ? PaymentTypeAdapter.toDto(payment.type) : null,
  };

  return PaymentDto.parse(dto);
};

const toDtoArray = (payments: PaymentWithType[]): PaymentDto[] => {
  return payments.map((payment) => toDto(payment));
};

export const PaymentAdapter = {
  toDto,
  toDtoArray,
};
