import { ReminderDto } from '@mammimia/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddFab from '../../components/AddFab';
import useEditModal from '../../hooks/useEditModal';
import useFetchData from '../../hooks/useFetchData';
import ReminderService from '../services/ReminderService';
import ReminderEditorModal from './ReminderEditorModal';
import ReminderList from './ReminderList';

const Reminders = () => {
  const { data, isFetching, refetch } = useFetchData<ReminderDto>({
    fetchMethod: ReminderService.get,
  });
  const { modalVisible, selectedItem, hideModal, openEditModal } =
    useEditModal<ReminderDto>();

  return (
    <>
      <View style={styles.container}>
        <Text>Reminders</Text>
        <ReminderList
          reminders={data}
          isFetching={isFetching}
          onRefresh={refetch}
          openEditModal={(reminder: ReminderDto) => openEditModal(reminder)}
        />
        <AddFab onPress={() => openEditModal()} />
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
