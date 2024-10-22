import { PaymentDto } from '@mammimia/types';
import ListEmptyComponent from '../../../components/list/ListEmptyComponent';
import ListPageContainer from '../../../components/list/ListPageContainer';
import React from 'react';
import { FlatList } from 'react-native';
import PaymentItem from './PaymentItem';

type Props = {
  payments: PaymentDto[];
  isFetching: boolean;
  onRefresh: () => void;
  pressable?: boolean;
};

const PaymentList = ({ payments, isFetching, onRefresh, pressable }: Props) => {
  return (
    <ListPageContainer isFetching={isFetching}>
      <FlatList
        data={payments}
        refreshing={isFetching}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <PaymentItem item={item} pressable={pressable} refetch={onRefresh} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <ListEmptyComponent text="No payments" />}
      />
    </ListPageContainer>
  );
};

export default PaymentList;
