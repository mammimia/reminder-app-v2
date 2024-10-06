import {
  BalanceDto,
  ChangeBalanceDto,
  CreateBalanceDto,
} from '@mammimia/types';
import AxiosService from './AxiosService';
import { TCrudService } from './TCrudService';

interface ExtendedCrudService<T, C> extends TCrudService<T, C> {
  increaseBalance: (dto: ChangeBalanceDto) => Promise<void>;
  reduceBalance: (dto: ChangeBalanceDto) => Promise<void>;
}

const BalanceService: ExtendedCrudService<BalanceDto, CreateBalanceDto> = {
  get: async () => AxiosService.get<BalanceDto[]>('balances'),
  create: async (dto: CreateBalanceDto) =>
    AxiosService.post<BalanceDto>('balances', dto),
  increaseBalance: async (dto: ChangeBalanceDto) => {
    await AxiosService.patch('balances/increase', dto);
  },
  reduceBalance: async (dto: ChangeBalanceDto) => {
    await AxiosService.patch('balances/reduce', dto);
  },
};

export default BalanceService;
