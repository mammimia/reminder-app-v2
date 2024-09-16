import { ReminderDto } from '@mammimia/types';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
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
      <View style={styles.container}>
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
          ListEmptyComponent={() => (
            <Text style={styles.listEmptyComponent}>No reminders</Text>
          )}
        />
      </View>
    </ActivityOverlay>
  );
};

export default ReminderList;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
  listEmptyComponent: {
    textAlign: 'center',
    fontSize: 20,
    color: 'gray',
    marginTop: 20,
  },
});
