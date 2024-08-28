import { ReminderDto } from '@mammimia/types';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AxiosService from '../services/AxiosService';
import ReminderAddButton from './ReminderAddButton';
import ReminderItem from './ReminderItem';

const Reminders = () => {
  const [reminders, setReminders] = useState<ReminderDto[]>([]);

  useEffect(() => {
    AxiosService.get<ReminderDto[]>('reminders')
      .then((response) => setReminders(response.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Reminders</Text>
      <FlatList
        data={reminders}
        renderItem={({ item }) => <ReminderItem reminder={item} />}
        keyExtractor={(item) => item.id}
      />
      <ReminderAddButton />
    </View>
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
