import { PaymentDto } from '@mammimia/types';
import React from 'react';
import useFetchData from '../../../hooks/useFetchData';
import PaymentService from '../../services/PaymentService';
import PaymentList from './PaymentList';

const Payments = () => {
  const { data, isFetching, refetch } = useFetchData<PaymentDto>({
    fetchMethod: PaymentService.get,
  });

  return (
    <PaymentList payments={data} isFetching={isFetching} onRefresh={refetch} />
  );
};

export default Payments;
