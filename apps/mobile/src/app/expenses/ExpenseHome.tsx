import { TColors, useStyles } from '@mammimia/ui';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderBar from '../../components/HeaderBar';
import Balances from './Balances';

const ExpenseHome = () => {
  const { styles } = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <HeaderBar mainText="Hi Mammimia," subText="Here is your expenses" />
      <Balances />
    </View>
  );
};

export default ExpenseHome;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    folderItemStyle: {
      width: 150,
    },
    reminderContainer: {
      flex: 1,
      marginBottom: 24,
    },
  });
