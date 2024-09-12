import React from 'react';
import CategoryList from './CategoryList';
import CategoryEditorModal from './CategoryEditorModal';
import useFetchData from '../../hooks/useFetchData';
import { CategoryDto } from '@mammimia/types';
import CategoryService from '../services/CategoryService';
import useEditorModal from '../../hooks/useEditorModal';
import AddFab from '../../components/AddFab';
import { StyleSheet, View } from 'react-native';

const Categories = () => {
  const { data, isFetching, refetch } = useFetchData<CategoryDto>({
    fetchMethod: CategoryService.get,
  });
  const { modalVisible, selectedItem, hideModal, openModal } =
    useEditorModal<CategoryDto>();

  return (
    <>
      <View style={styles.container}>
        <CategoryList data={data} isFetching={isFetching} onRefresh={refetch} />
        <AddFab onPress={() => openModal()} />
      </View>
      <CategoryEditorModal
        visible={modalVisible}
        hideModal={hideModal}
        defaultValues={selectedItem}
        refetch={refetch}
      />
    </>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
});
