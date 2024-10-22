import { useActionSheet } from '@expo/react-native-action-sheet';
import { PaymentDto, TransactionType } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ColorCircle from '../../../components/ColorCircle';
import AmountUtils from '../../../utils/AmountUtils';
import DateUtils from '../../../utils/DateUtils';
import StringUtils from '../../../utils/StringUtils';
import showCustomActionSheet, {
  ActionSheetOption,
} from '../../../utils/showCustomActionSheet';

type Props = {
  item: PaymentDto;
  pressable?: boolean;
};

const PaymentItem = ({ item, pressable }: Props) => {
  const { styles, colors } = useStyles(createStyles);
  const { showActionSheetWithOptions } = useActionSheet();

  const handleLongPress = () => {
    if (!pressable) return;

    const options: ActionSheetOption[] = [
      {
        label: 'Edit',
        onPress: () => console.log('Edit'),
      },
      {
        label: 'Delete',
        onPress: () => console.log('Delete'),
        isDestructive: true,
      },
      {
        label: 'Close',
        onPress: () => {
          /* Do nothing */
        },
        isCancel: true,
      },
    ];

    showCustomActionSheet(
      {
        options,
        title: 'Payment Actions',
        message: 'Select an option to manage your payment.',
        tintColor: colors.primary,
      },
      showActionSheetWithOptions
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={pressable ? 0.2 : 1}
      onLongPress={handleLongPress}
    >
      <View style={styles.paymentItem}>
        <View style={styles.innerContainer}>
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
          {item.type && (
            <View style={styles.paymentType}>
              <ColorCircle color={item.type.color} size={12} />
              <Text style={styles.description}>
                {StringUtils.convertToTitleCase(item.type.name)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentItem;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    innerContainer: {
      justifyContent: 'space-between',
    },
    paymentItem: {
      padding: 10,
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
      fontSize: 13,
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
    paymentType: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-end',
      marginTop: 5,
      gap: 5,
    },
  });
