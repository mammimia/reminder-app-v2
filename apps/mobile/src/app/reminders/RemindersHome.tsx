import { TColors, useStyles } from '@mammimia/ui';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FolderList from '../folders/FolderList';
import Reminders from './Reminders';
import useFetchData from '../../hooks/useFetchData';
import { FolderDto } from '@mammimia/types';
import FolderService from '../services/FolderService';
import ReminderHeaderBar from './ReminderHeaderBar';

const RemindersHome = () => {
  const { styles } = useStyles(createStyles);
  const {
    data: folders,
    isFetching,
    refetch,
  } = useFetchData<FolderDto>({
    fetchMethod: FolderService.get,
  });

  return (
    <View style={styles.container}>
      <ReminderHeaderBar />
      <FolderList
        data={folders}
        isFetching={isFetching}
        onRefresh={refetch}
        folderItemStyle={styles.folderItemStyle}
      />
      <Reminders />
    </View>
  );
};

export default RemindersHome;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    folderItemStyle: {
      width: 150,
    },
  });
