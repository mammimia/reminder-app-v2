/* eslint-disable jsx-a11y/accessible-emoji */
import { FolderDto, ReminderDto } from '@mammimia/types';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FolderSliderItem from './folders/FolderSliderItem';
import AxiosService from './services/AxiosService';
import ReminderItem from './reminders/ReminderItem';

export const App = () => {
  const [folders, setFolders] = useState<FolderDto[]>([]);
  const [reminders, setReminders] = useState<ReminderDto[]>([]);

  useEffect(() => {
    AxiosService.get<FolderDto[]>('folders')
      .then((response) => setFolders(response.data))
      .catch((error) => {
        console.error(error);
      });

    AxiosService.get<ReminderDto[]>('reminders')
      .then((response) => setReminders(response.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <Text>Folders</Text>
          <FlatList
            data={folders}
            renderItem={({ item }) => <FolderSliderItem folder={item} />}
            keyExtractor={(item) => item.id}
            horizontal
          />

          <Text>Reminders</Text>
          <FlatList
            data={reminders}
            renderItem={({ item }) => <ReminderItem reminder={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
});

export default App;
