import { ReminderDto } from '@mammimia/types';
import React from 'react';
import { FlatList } from 'react-native';
import ListEmptyComponent from '../../components/list/ListEmptyComponent';
import ListPageContainer from '../../components/list/ListPageContainer';
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
    <ListPageContainer isFetching={isFetching}>
      <FlatList
        data={reminders}
        refreshing={isFetching}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <ReminderItem
            reminder={item}
            openEditModal={openEditModal}
            refetch={onRefresh}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <ListEmptyComponent text="No reminders" />}
      />
    </ListPageContainer>
  );
};

export default ReminderList;
