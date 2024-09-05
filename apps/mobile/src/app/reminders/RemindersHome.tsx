import React from 'react';
import { StyleSheet, View } from 'react-native';
import FolderList from '../folders/FolderList';
import Reminders from './Reminders';

const RemindersHome = () => {
  return (
    <View style={styles.container}>
      <FolderList folderItemStyle={styles.folderItemStyle} />
      <Reminders />
    </View>
  );
};

export default RemindersHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  folderItemStyle: {
    width: 150,
  },
});
