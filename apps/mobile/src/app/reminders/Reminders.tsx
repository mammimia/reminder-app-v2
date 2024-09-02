import { ReminderDto } from '@mammimia/types';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ReminderService from '../services/ReminderService';
import ReminderAddButton from './ReminderAddButton';
import ReminderEditorModal from './ReminderEditorModal';
import ReminderItem from './ReminderItem';
import ActivityOverlay from '../../components/ActivityIndicator';

const Reminders = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [reminders, setReminders] = useState<ReminderDto[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedReminder, setSelectedReminder] =
    useState<ReminderDto | null>();

  const getReminders = async () => {
    setIsFetching(true);
    try {
      const response = await ReminderService.get();
      setReminders(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getReminders();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>Reminders</Text>
        <ActivityOverlay isLoading={isFetching}>
          <FlatList
            data={reminders}
            refreshing={isFetching}
            onRefresh={getReminders}
            renderItem={({ item }) => (
              <ReminderItem
                reminder={item}
                openEditModal={(reminder: ReminderDto) => {
                  setSelectedReminder(reminder);
                  setModalVisible(true);
                }}
                refetchReminders={getReminders}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </ActivityOverlay>
        <ReminderAddButton openModal={() => setModalVisible(true)} />
      </View>
      <ReminderEditorModal
        visible={modalVisible}
        hideModal={() => {
          setModalVisible(false);
          setSelectedReminder(null);
        }}
        defaultValues={selectedReminder}
        refetchReminders={getReminders}
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
