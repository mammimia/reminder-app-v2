import { PaymentDto } from '@mammimia/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddFab from '../../../components/AddFab';
import useEditorModal from '../../../hooks/useEditorModal';
import useFetchData from '../../../hooks/useFetchData';
import PaymentService from '../../services/PaymentService';
import PaymentEditorModal from './PaymentEditorModal';
import PaymentList from './PaymentList';

const Payments = () => {
  const { data, isFetching, refetch } = useFetchData<PaymentDto>({
    fetchMethod: PaymentService.get,
  });

  const { modalVisible, selectedItem, hideModal, openModal } =
    useEditorModal<PaymentDto>();

  return (
    <>
      <View style={styles.container}>
        <PaymentList
          payments={data}
          isFetching={isFetching}
          onRefresh={refetch}
        />
        <AddFab onPress={() => openModal()} />
      </View>
      <PaymentEditorModal
        visible={modalVisible}
        hideModal={hideModal}
        defaultValues={selectedItem}
        refetch={refetch}
      />
    </>
  );
};

export default Payments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
});
