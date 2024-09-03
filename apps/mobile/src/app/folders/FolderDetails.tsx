import { ReminderDto } from '@mammimia/types';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReminderList from '../reminders/ReminderList';
import ReminderService from '../services/ReminderService';

type Props = {
  route: {
    params: {
      folderName: string;
      folderId: string;
    };
  };
};

const FolderDetails = ({ route }: Props) => {
  const { folderId, folderName } = route.params;

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [reminders, setReminders] = useState<ReminderDto[]>([]);

  const getReminders = async () => {
    setIsFetching(true);
    try {
      const response = await ReminderService.get({
        folderId: folderId,
      });
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
    <View style={styles.container}>
      <Text>{folderName} Folder</Text>
      <ReminderList
        reminders={reminders}
        isFetching={isFetching}
        onRefresh={getReminders}
      />
    </View>
  );
};

export default FolderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
