import { PaymentDto, TransactionType } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import useFetchData from '../../hooks/useFetchData';
import AmountUtils from '../../utils/AmountUtils';
import DateUtils from '../../utils/DateUtils';
import PaymentService from '../services/PaymentService';

const Payments = () => {
  const { styles, colors } = useStyles(createStyles);
  const { data } = useFetchData<PaymentDto>({
    fetchMethod: PaymentService.get,
  });

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={styles.paymentItem}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>
              {DateUtils.formatDate(item.paymentDate)}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text
              style={[
                styles.amount,
                item.transactionType === TransactionType.INCOME
                  ? { color: colors.green500 }
                  : { color: colors.red500 },
              ]}
            >
              {item.transactionType === TransactionType.INCOME ? ' + ' : ' - '}
              {AmountUtils.format(item.amount, item.currency)}
            </Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Payments;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    paymentItem: {
      padding: 10,
      marginHorizontal: 20,
      marginVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray500,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    date: {
      fontSize: 12,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 12,
      color: colors.gray900,
    },
    amountContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    amount: {
      textAlign: 'right',
      fontSize: 15,
      fontWeight: 'bold',
    },
  });
