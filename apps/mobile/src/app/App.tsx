/* eslint-disable jsx-a11y/accessible-emoji */
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
import AxiosService from './services/AxiosService';
import { CategoryDto, FolderDto, ReminderDto } from '@mammimia/types';

export const App = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [folders, setFolders] = useState<FolderDto[]>([]);
  const [reminders, setReminders] = useState<ReminderDto[]>([]);

  useEffect(() => {
    AxiosService.get<CategoryDto[]>('categories')
      .then((response) => setCategories(response.data))
      .catch((error) => {
        console.error(error);
      });

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
          <Text>Categories</Text>
          <FlatList
            data={categories}
            renderItem={({ item }) => <Text key={item.id}>{item.name}</Text>}
            keyExtractor={(item) => item.id.toString()}
          />

          <Text>Folders</Text>
          <FlatList
            data={folders}
            renderItem={({ item }) => (
              <Text key={item.id}>
                {item.category?.name || 'General Category'} - {item.name}
              </Text>
            )}
            keyExtractor={(item) => item.id.toString()}
          />

          <Text>Reminders</Text>
          <FlatList
            data={reminders}
            renderItem={({ item }) => (
              <Text key={item.id}>
                {item.folder?.name || 'General Folder'} - {item.title} -{' '}
                {item.content}
              </Text>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <ScrollView></ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
