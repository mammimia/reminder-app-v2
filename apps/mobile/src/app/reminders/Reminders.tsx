import { ReminderDto } from '@mammimia/types';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ReminderService from '../services/ReminderService';
import ReminderAddButton from './ReminderAddButton';
import ReminderEditorModal from './ReminderEditorModal';
import ReminderItem from './ReminderItem';

const Reminders = () => {
  const [reminders, setReminders] = useState<ReminderDto[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedReminder, setSelectedReminder] =
    useState<ReminderDto | null>();

  useEffect(() => {
    ReminderService.get()
      .then((response) => setReminders(response.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>Reminders</Text>
        <FlatList
          data={reminders}
          renderItem={({ item }) => (
            <ReminderItem
              reminder={item}
              openEditModal={(reminder: ReminderDto) => {
                setSelectedReminder(reminder);
                setModalVisible(true);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
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