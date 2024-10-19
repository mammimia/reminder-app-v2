import { PaymentDto } from '@mammimia/types';
import React from 'react';
import AddablePage from '../../../components/AddablePage';
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
      <AddablePage onPress={openModal}>
        <PaymentList
          payments={data}
          isFetching={isFetching}
          onRefresh={refetch}
        />
      </AddablePage>
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
