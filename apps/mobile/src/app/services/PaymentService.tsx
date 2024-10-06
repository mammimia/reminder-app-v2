import {
  CreatePaymentDto,
  PaymentDto,
  UpdatePaymentDto,
} from '@mammimia/types';
import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';
import { TCrudService } from './TCrudService';

interface ExtendedCrudService<T, C, U> extends TCrudService<T, C, U> {
  pay: (id: string) => Promise<AxiosResponse<T>>;
}

const BalanceService: ExtendedCrudService<
  PaymentDto,
  CreatePaymentDto,
  UpdatePaymentDto
> = {
  get: async () => AxiosService.get<PaymentDto[]>('payments'),
  create: async (dto: CreatePaymentDto) =>
    AxiosService.post<PaymentDto>('payments', dto),
  update: async (id: string, dto: UpdatePaymentDto) =>
    AxiosService.put<PaymentDto>(`payments/${id}`, dto),
  remove: async (id: string) =>
    AxiosService.delete<PaymentDto>(`payments/${id}`),
  pay: async (id: string) =>
    AxiosService.post<PaymentDto>(`payments/${id}/pay`),
};

export default BalanceService;
