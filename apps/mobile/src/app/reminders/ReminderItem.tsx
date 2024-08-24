import { ReminderDto } from '@mammimia/types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  reminder: ReminderDto;
};

const ReminderItem = ({ reminder }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onLongPress={() => {
        console.log('Long press');
      }}
    >
      <View style={styles.container}>
        <Text>Title: {reminder.title}</Text>
        <Text>Content: {reminder.content}</Text>
        <Text>Due Date: {reminder.expiresAt} </Text>
        <Text>Folder: {reminder.folder?.name}</Text>
        <Text>Status: {reminder.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReminderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    margin: 10,
    padding: 10,
  },
});
