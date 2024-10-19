import { CategoryDto } from '@mammimia/types';
import React from 'react';
import AddablePage from '../../components/AddablePage';
import useEditorModal from '../../hooks/useEditorModal';
import useFetchData from '../../hooks/useFetchData';
import CategoryService from '../services/CategoryService';
import CategoryEditorModal from './CategoryEditorModal';
import CategoryList from './CategoryList';

const Categories = () => {
  const { data, isFetching, refetch } = useFetchData<CategoryDto>({
    fetchMethod: CategoryService.get,
  });
  const { modalVisible, selectedItem, hideModal, openModal } =
    useEditorModal<CategoryDto>();

  return (
    <>
      <AddablePage onPress={openModal}>
        <CategoryList
          data={data}
          isFetching={isFetching}
          onRefresh={refetch}
          openEditModal={openModal}
        />
      </AddablePage>
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
