import { ReminderDto } from '@mammimia/types';
import React from 'react';
import { FlatList } from 'react-native';
import ActivityOverlay from '../../components/ActivityIndicator';
import ReminderItem from './ReminderItem';

type Props = {
  reminders: ReminderDto[];
  isFetching: boolean;
  onRefresh: () => void;
  openEditModal?: (reminder: ReminderDto) => void;
};

const ReminderList = ({
  isFetching,
  reminders,
  onRefresh,
  openEditModal,
}: Props) => {
  return (
    <ActivityOverlay isLoading={isFetching}>
      <FlatList
        data={reminders}
        refreshing={isFetching}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <ReminderItem
            reminder={item}
            openEditModal={openEditModal}
            refetchReminders={onRefresh}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </ActivityOverlay>
  );
};

export default ReminderList;
