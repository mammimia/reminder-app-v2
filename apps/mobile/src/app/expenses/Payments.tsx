import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useFetchData from '../../hooks/useFetchData';
import { PaymentDto } from '@mammimia/types';
import PaymentService from '../services/PaymentService';
import AmountUtils from '../../utils/AmountUtils';
import DateUtils from '../../utils/DateUtils';

const Payments = () => {
  const { data } = useFetchData<PaymentDto>({
    fetchMethod: PaymentService.get,
  });

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={styles.paymentItem}>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>{DateUtils.formatDate(item.paymentDate)}</Text>
          <Text>{AmountUtils.format(item.amount, item.currency)}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Payments;

const styles = StyleSheet.create({
  paymentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});
