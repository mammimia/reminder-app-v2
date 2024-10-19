import { PaymentTypeDto } from '@mammimia/types';
import React from 'react';
import { FlatList } from 'react-native';
import AddablePage from '../../../components/AddablePage';
import ListEmptyComponent from '../../../components/list/ListEmptyComponent';
import ListPageContainer from '../../../components/list/ListPageContainer';
import useEditorModal from '../../../hooks/useEditorModal';
import useFetchData from '../../../hooks/useFetchData';
import PaymentTypeService from '../../services/PaymentTypeService';
import PaymentTypeEditorModal from './PaymentTypeEditorModal';
import PaymentTypeItem from './PaymentTypeItem';

const PaymentTypes = () => {
  const { data, isFetching, refetch } = useFetchData<PaymentTypeDto>({
    fetchMethod: PaymentTypeService.get,
  });

  const { modalVisible, selectedItem, hideModal, openModal } =
    useEditorModal<PaymentTypeDto>();

  return (
    <AddablePage onPress={openModal}>
      <ListPageContainer isFetching={isFetching}>
        <FlatList
          data={data}
          refreshing={isFetching}
          onRefresh={refetch}
          renderItem={({ item }) => (
            <PaymentTypeItem
              item={item}
              refetch={refetch}
              openEditModal={(paymentType: PaymentTypeDto) =>
                openModal(paymentType)
              }
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <ListEmptyComponent text="No payment types" />
          )}
        />
      </ListPageContainer>
      <PaymentTypeEditorModal
        visible={modalVisible}
        hideModal={hideModal}
        defaultValues={selectedItem}
        refetch={refetch}
      />
    </AddablePage>
  );
};

export default PaymentTypes;
