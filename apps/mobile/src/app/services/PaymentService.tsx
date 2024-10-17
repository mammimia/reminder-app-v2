import {
  CreatePaymentDto,
  PaymentDto,
  PaymentFilterDto,
  UpdatePaymentDto,
} from '@mammimia/types';
import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';
import { TCrudService } from './TCrudService';

interface ExtendedCrudService<T, C, U, F> extends TCrudService<T, C, U, F> {
  pay: (id: string) => Promise<AxiosResponse<T>>;
}

const PaymentService: ExtendedCrudService<
  PaymentDto,
  CreatePaymentDto,
  UpdatePaymentDto,
  PaymentFilterDto
> = {
  get: async (filter?: PaymentFilterDto) =>
    AxiosService.get<PaymentDto[]>('payments', { ...filter }),
  create: async (dto: CreatePaymentDto) =>
    AxiosService.post<PaymentDto>('payments', dto),
  update: async (id: string, dto: UpdatePaymentDto) =>
    AxiosService.put<PaymentDto>(`payments/${id}`, dto),
  remove: async (id: string) =>
    AxiosService.delete<PaymentDto>(`payments/${id}`),
  pay: async (id: string) =>
    AxiosService.post<PaymentDto>(`payments/${id}/pay`),
};

export default PaymentService;
