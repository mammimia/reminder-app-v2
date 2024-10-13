import { TColors, useStyles } from '@mammimia/ui';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Balances from './Balances';
import RecentPayments from './RecentPayments';

const ExpenseHome = () => {
  const { styles } = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <Balances />
      <RecentPayments />
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
