import { ReminderDto } from '@mammimia/types';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddFab from '../../components/AddFab';
import SearchInput from '../../components/SearchInput';
import useEditorModal from '../../hooks/useEditorModal';
import useFetchData from '../../hooks/useFetchData';
import ReminderService from '../services/ReminderService';
import ReminderEditorModal from './ReminderEditorModal';
import ReminderList from './ReminderList';

const Reminders = () => {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const { data, isFetching, refetch } = useFetchData<ReminderDto>({
    fetchMethod: ReminderService.get,
    params: { title: searchFilter },
  });
  const { modalVisible, selectedItem, hideModal, openModal } =
    useEditorModal<ReminderDto>();

  return (
    <>
      <View style={styles.container}>
        <SearchInput
          text={searchFilter}
          setText={setSearchFilter}
          handleEnter={() => {
            refetch();
          }}
        />
        <ReminderList
          reminders={data}
          isFetching={isFetching}
          onRefresh={refetch}
          openEditModal={(reminder: ReminderDto) => openModal(reminder)}
        />
        <AddFab onPress={() => openModal()} />
      </View>
      <ReminderEditorModal
        visible={modalVisible}
        hideModal={hideModal}
        defaultValues={selectedItem}
        refetchReminders={refetch}
      />
    </>
  );
};

export default Reminders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
});
