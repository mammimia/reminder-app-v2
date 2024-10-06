import {
  CreatePaymentTypeDto,
  PaymentTypeDto,
  UpdatePaymentTypeDto,
} from '@mammimia/types';
import AxiosService from './AxiosService';
import { TCrudService } from './TCrudService';

const PaymentTypeService: TCrudService<
  PaymentTypeDto,
  CreatePaymentTypeDto,
  UpdatePaymentTypeDto
> = {
  get: async () => AxiosService.get<PaymentTypeDto[]>('payment-types'),
  create: async (dto: CreatePaymentTypeDto) =>
    AxiosService.post<PaymentTypeDto>('payment-types', dto),
  update: async (id: string, folder: UpdatePaymentTypeDto) =>
    AxiosService.put<PaymentTypeDto>(`payment-types/${id}`, folder),
  remove: async (id: string) =>
    AxiosService.delete<PaymentTypeDto>(`payment-types/${id}`),
};

export default PaymentTypeService;
