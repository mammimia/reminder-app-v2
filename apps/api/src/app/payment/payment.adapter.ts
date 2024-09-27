import { PaymentDto } from '@mammimia/types';
import { Payment } from '@prisma/client';

const toDto = (payment: Payment): PaymentDto => {
  const dto = {
    id: payment.id,
    color: payment.color,
    name: payment.name,
    period: payment.period,
  };

  return PaymentDto.parse(dto);
};

const toDtoArray = (payments: Payment[]): PaymentDto[] => {
  return payments.map((payment) => toDto(payment));
};

export const PaymentAdapter = {
  toDto,
  toDtoArray,
};
