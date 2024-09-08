import { ReminderDto } from '@mammimia/types';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useFetchData from '../../hooks/useFetchData';
import ReminderService from '../services/ReminderService';
import ReminderAddButton from './ReminderAddButton';
import ReminderEditorModal from './ReminderEditorModal';
import ReminderList from './ReminderList';

const Reminders = () => {
  const { data, isFetching, refetch } = useFetchData<ReminderDto>({
    fetchMethod: ReminderService.get,
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedReminder, setSelectedReminder] =
    useState<ReminderDto | null>();

  return (
    <>
      <View style={styles.container}>
        <Text>Reminders</Text>
        <ReminderList
          reminders={data}
          isFetching={isFetching}
          onRefresh={refetch}
          openEditModal={(reminder: ReminderDto) => {
            setSelectedReminder(reminder);
            setModalVisible(true);
          }}
        />
        <ReminderAddButton openModal={() => setModalVisible(true)} />
      </View>
      <ReminderEditorModal
        visible={modalVisible}
        hideModal={() => {
          setModalVisible(false);
          setSelectedReminder(null);
        }}
        defaultValues={selectedReminder}
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
