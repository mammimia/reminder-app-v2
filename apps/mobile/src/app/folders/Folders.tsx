import { FolderDto } from '@mammimia/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddFab from '../../components/AddFab';
import useEditorModal from '../../hooks/useEditorModal';
import useFetchData from '../../hooks/useFetchData';
import FolderService from '../services/FolderService';
import FolderEditorModal from './FolderEditorModal';
import FolderList from './FolderList';

const Folders = () => {
  const { data, isFetching, refetch } = useFetchData<FolderDto>({
    fetchMethod: FolderService.get,
  });
  const { modalVisible, selectedItem, hideModal, openModal } =
    useEditorModal<FolderDto>();

  return (
    <>
      <View style={styles.container}>
        <FolderList
          data={data}
          onRefresh={refetch}
          openEditModal={openModal}
          isFetching={isFetching}
          horizontal={false}
          flatListStyle={styles.flatListStyle}
        />
        <AddFab onPress={() => openModal()} />
      </View>
      <FolderEditorModal
        visible={modalVisible}
        hideModal={hideModal}
        defaultValues={selectedItem}
        refetch={refetch}
      />
    </>
  );
};

export default Folders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  folderItemStyle: {
    flex: 1,
  },
  flatListStyle: {
    padding: 10,
  },
});
