import { PaymentDto } from '@mammimia/types';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SectionTitle from '../../../components/SectionTitle';
import useFetchData from '../../../hooks/useFetchData';
import PaymentService from '../../services/PaymentService';
import PaymentList from './PaymentList';

const RecentPayments = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { data, isFetching, refetch } = useFetchData<PaymentDto>({
    fetchMethod: PaymentService.get,
    params: { limit: 5 },
  });

  return (
    <View style={styles.container}>
      <SectionTitle
        title="Recent Payments"
        handleSeeAll={() => {
          navigation.navigate('Payments');
        }}
      />
      <PaymentList
        payments={data}
        isFetching={isFetching}
        onRefresh={refetch}
      />
    </View>
  );
};

export default RecentPayments;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
});
