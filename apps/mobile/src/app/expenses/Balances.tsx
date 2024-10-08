import { BalanceDto, Currency } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import useFetchData from '../../hooks/useFetchData';
import AmountUtils from '../../utils/AmountUtils';
import BalanceService from '../services/BalanceService';
import { DollarRateStorage } from '../../storages/DollarRateStorage';

const Balances = () => {
  const [dollarRate, setDollarRate] = useState<number>(0);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const { styles } = useStyles(createStyles);
  const { data } = useFetchData<BalanceDto>({
    fetchMethod: BalanceService.get,
  });

  useEffect(() => {
    const fetchDollarRate = async () => {
      const rate = await DollarRateStorage.getDollarRate();
      setDollarRate(rate);
    };

    fetchDollarRate();
  }, []);

  useEffect(() => {
    if (data) {
      const total = AmountUtils.calculateTotalBalance(data, dollarRate);
      setTotalBalance(total);
    }
  }, [data, dollarRate]);

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
      <Divider />
      <View>
        <Text style={styles.balanceText}>Current Dollar Rate</Text>
        <Text style={styles.balanceText}>
          {AmountUtils.format(dollarRate, Currency.USD)}
        </Text>
      </View>

      <Button
        onPress={() => {
          const newRate = parseFloat(
            (Math.random() * (40 - 30) + 30).toFixed(2)
          );
          DollarRateStorage.saveDollarRate(newRate);
          setDollarRate(newRate);
        }}
      >
        Save Dollar Rate
      </Button>
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
