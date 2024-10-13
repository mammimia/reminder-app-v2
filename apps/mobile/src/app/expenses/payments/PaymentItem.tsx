import { PaymentDto, TransactionType } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AmountUtils from '../../../utils/AmountUtils';
import DateUtils from '../../../utils/DateUtils';

type Props = {
  item: PaymentDto;
};

const PaymentItem = ({ item }: Props) => {
  const { styles, colors } = useStyles(createStyles);
  return (
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
  );
};

export default PaymentItem;

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
