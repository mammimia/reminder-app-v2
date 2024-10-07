import { BalanceDto, Currency } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import useFetchData from '../../hooks/useFetchData';
import AmountUtils from '../../utils/AmountUtils';
import BalanceService from '../services/BalanceService';

const Balances = () => {
  const { styles } = useStyles(createStyles);
  const { data } = useFetchData<BalanceDto>({
    fetchMethod: BalanceService.get,
  });

  const totalBalance = AmountUtils.calculateTotalBalance(data, 34.25);

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Total Balance</Text>
      <Text style={styles.balanceText}>
        {AmountUtils.format(totalBalance, Currency.TL)}
      </Text>
      <Divider />
      <Text style={styles.balanceText}>Balances</Text>
      <View style={styles.balancesContainer}>
        {data.map((balance) => (
          <View key={balance.id} style={styles.balanceContainer}>
            <View style={[styles.balanceContainer]}>
              <Text style={styles.balanceText}>
                {AmountUtils.format(balance.amount, balance.currency)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Balances;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.blue300,
      gap: 10,
      padding: 10,
      marginHorizontal: 20,
      borderRadius: 10,
    },
    balancesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    balanceContainer: {
      flexDirection: 'row',
    },
    balanceText: {
      color: colors.white,
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
