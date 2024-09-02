import React from 'react';
import { StyleSheet, View } from 'react-native';
import Folders from '../folders/Folders';
import Reminders from './Reminders';

const RemindersHome = () => {
  return (
    <View style={styles.container}>
      <Folders />
      <Reminders />
    </View>
  );
};

export default RemindersHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
