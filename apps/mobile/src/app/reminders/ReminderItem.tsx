import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ReminderDto } from '@mammimia/types';

type Props = {
  reminder: ReminderDto;
};

const ReminderItem = ({ reminder }: Props) => {
  return (
    <View>
      <Text key={reminder.id}>
        {reminder.folder?.name || 'General Folder'} - {reminder.title} -
        {reminder.content}
      </Text>
    </View>
  );
};

export default ReminderItem;

const styles = StyleSheet.create({});
