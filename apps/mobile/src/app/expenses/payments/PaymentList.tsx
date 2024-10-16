import { PaymentDto } from '@mammimia/types';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ActivityOverlay from '../../../components/ActivityIndicator';
import PaymentItem from './PaymentItem';

type Props = {
  payments: PaymentDto[];
  isFetching: boolean;
  onRefresh: () => void;
};

const PaymentList = ({ payments, isFetching, onRefresh }: Props) => {
  return (
    <ActivityOverlay isLoading={isFetching}>
      <View style={styles.container}>
        <FlatList
          data={payments}
          refreshing={isFetching}
          onRefresh={onRefresh}
          renderItem={({ item }) => <PaymentItem item={item} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <Text style={styles.listEmptyComponent}>No payments</Text>
          )}
        />
      </View>
    </ActivityOverlay>
  );
};

export default PaymentList;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
  listEmptyComponent: {
    textAlign: 'center',
    fontSize: 20,
    color: 'gray',
    marginTop: 20,
  },
});
