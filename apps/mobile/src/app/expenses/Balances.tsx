import { BalanceDto, Currency } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import HeaderBar from '../../components/HeaderBar';
import useFetchData from '../../hooks/useFetchData';
import { DollarRateStorage } from '../../storages/DollarRateStorage';
import AmountUtils from '../../utils/AmountUtils';
import BalanceService from '../services/BalanceService';

const Balances = () => {
  const [dollarRate, setDollarRate] = useState<number>(0);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const { styles, colors } = useStyles(createStyles);
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
      <HeaderBar
        mainText="Hi Mammimia,"
        subText="Here is your expenses"
        bgColor={colors.blue500}
        textColor={colors.white}
      />
      <View style={styles.innerContainer}>
        <BalanceItem
          title="Total Balance"
          amount={totalBalance}
          currency={Currency.TL}
          isBold
        />
        {data?.map((balance) => (
          <BalanceItem
            key={balance.id}
            title={balance.currency}
            amount={balance.amount}
            currency={balance.currency}
          />
        ))}

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

        <Text style={styles.dollarRateText}>
          1 USD = {AmountUtils.format(dollarRate, Currency.TL)}
        </Text>
      </View>
    </View>
  );
};

type BalanceItemProps = {
  title: string;
  amount: number;
  currency: Currency;
  isBold?: boolean;
};

const BalanceItem = ({ title, amount, currency, isBold }: BalanceItemProps) => {
  const { styles } = useStyles(createStyles);

  return (
    <View style={styles.balanceContainer}>
      <Text
        style={[styles.balanceText, isBold ? { fontWeight: 'bold' } : null]}
      >
        {title}
      </Text>
      <Text
        style={[styles.balanceText, isBold ? { fontWeight: 'bold' } : null]}
      >
        {AmountUtils.format(amount, currency)}
      </Text>
    </View>
  );
};

export default Balances;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.blue500,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
    innerContainer: {
      gap: 10,
      padding: 10,
      marginHorizontal: 20,
      marginBottom: 10,
    },
    balanceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    balanceText: {
      fontSize: 18,
      color: colors.white,
    },
    dollarRateText: {
      fontSize: 12,
      fontStyle: 'italic',
      fontWeight: 'bold',
      color: colors.white,
      alignSelf: 'flex-end',
    },
  });
