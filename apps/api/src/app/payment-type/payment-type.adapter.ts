import { PaymentTypeDto } from '@mammimia/types';
import { PaymentType } from '@prisma/client';

const toDto = (paymentType: PaymentType): PaymentTypeDto => {
  const dto = {
    id: paymentType.id,
    color: paymentType.color,
    name: paymentType.name,
    period: paymentType.period,
  };

  return PaymentTypeDto.parse(dto);
};

const toDtoArray = (paymentTypes: PaymentType[]): PaymentTypeDto[] => {
  return paymentTypes.map((paymentType) => toDto(paymentType));
};

export const PaymentTypeAdapter = {
  toDto,
  toDtoArray,
};
