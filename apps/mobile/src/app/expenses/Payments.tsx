import { PaymentDto } from '@mammimia/types';
import React from 'react';
import { FlatList } from 'react-native';
import useFetchData from '../../hooks/useFetchData';
import PaymentService from '../services/PaymentService';
import PaymentItem from './PaymentItem';

const Payments = () => {
  const { data } = useFetchData<PaymentDto>({
    fetchMethod: PaymentService.get,
  });

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <PaymentItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Payments;
