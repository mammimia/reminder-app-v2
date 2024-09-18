import { FolderDto, ReminderDto } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchInput from '../../components/SearchInput';
import SectionTitle from '../../components/SectionTitle';
import useFetchData from '../../hooks/useFetchData';
import FolderList from '../folders/FolderList';
import FolderService from '../services/FolderService';
import ReminderService from '../services/ReminderService';
import ReminderHeaderBar from './ReminderHeaderBar';
import ReminderList from './ReminderList';

const RemindersHome = () => {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const navigation = useNavigation();
  const { styles } = useStyles(createStyles);
  const {
    data: folders,
    isFetching: isFoldersFetching,
    refetch: refetchFolders,
  } = useFetchData<FolderDto>({
    fetchMethod: FolderService.get,
    params: { name: searchFilter },
  });

  const {
    data: reminders,
    isFetching: isRemindersFetching,
    refetch: refetchReminders,
  } = useFetchData<ReminderDto>({
    fetchMethod: ReminderService.get,
    params: { title: searchFilter },
  });

  return (
    <View style={styles.container}>
      <ReminderHeaderBar />
      <SearchInput
        text={searchFilter}
        setText={setSearchFilter}
        handleEnter={() => {
          refetchReminders();
          refetchFolders();
        }}
      />
      <SectionTitle
        title="Folders"
        handleSeeAll={() => {
          navigation.navigate('Folders');
        }}
      />
      <FolderList
        data={folders}
        isFetching={isFoldersFetching}
        onRefresh={refetchFolders}
        folderItemStyle={styles.folderItemStyle}
      />
      <View style={styles.reminderContainer}>
        <SectionTitle
          title="Today's Reminders"
          handleSeeAll={() => {
            navigation.navigate('Reminders');
          }}
        />
        <ReminderList
          reminders={reminders}
          isFetching={isRemindersFetching}
          onRefresh={refetchReminders}
        />
      </View>
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
    reminderContainer: {
      flex: 1,
      marginBottom: 24,
    },
  });
