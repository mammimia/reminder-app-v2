import { BalanceDto, Currency } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useActionSheet } from '@expo/react-native-action-sheet';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'react-native-paper';
import HeaderBar from '../../../components/HeaderBar';
import useEditorModal from '../../../hooks/useEditorModal';
import useFetchData from '../../../hooks/useFetchData';
import { DollarRateStorage } from '../../../storages/DollarRateStorage';
import AmountUtils from '../../../utils/AmountUtils';
import showCustomActionSheet, {
  ActionSheetOption,
} from '../../../utils/showCustomActionSheet';
import BalanceService from '../../services/BalanceService';
import DollarRateModal from './DollarRateModal';

const Balances = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const { showActionSheetWithOptions } = useActionSheet();
  const { modalVisible, hideModal, openModal } = useEditorModal();
  const { styles, colors } = useStyles(createStyles);

  const [dollarRate, setDollarRate] = useState<number>(0);
  const [totalBalance, setTotalBalance] = useState<number>(0);

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

  const handleOptionsPress = () => {
    const options: ActionSheetOption[] = [
      {
        label: 'Set Dollar Rate',
        onPress: openModal,
      },
    ];

    showCustomActionSheet(
      {
        options,
        title: 'Balance Actions',
      },
      showActionSheetWithOptions
    );
  };

  const handleDetailsPress = () => {
    navigation.navigate('BalanceDetails');
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        mainText="Hi Mammimia,"
        subText="Here is your expenses"
        bgColor={colors.blue500}
        textColor={colors.white}
        icon="ellipsis-vertical-circle-outline"
        handlePress={handleOptionsPress}
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

        <Text style={styles.dollarRateText}>
          1 USD = {AmountUtils.format(dollarRate, Currency.TL)}
        </Text>
        <TouchableOpacity>
          <Button
            mode="outlined"
            style={styles.detailsButton}
            onPress={handleDetailsPress}
            labelStyle={styles.detailsButtonText}
          >
            Details
          </Button>
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <DollarRateModal
          modalVisible={modalVisible}
          hideModal={hideModal}
          dollarRate={dollarRate}
          setDollarRate={setDollarRate}
        />
      )}
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
    detailsButton: {
      alignSelf: 'center',
      backgroundColor: colors.white,
      borderColor: colors.white,
      borderWidth: 1,
      width: 100,
    },
    detailsButtonText: {
      fontSize: 14,
      color: colors.blue500,
    },
  });
