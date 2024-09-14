import { useActionSheet } from '@expo/react-native-action-sheet';
import { ReminderDto, ReminderStatus } from '@mammimia/types';
import { useColors } from '@mammimia/ui';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateUtils from '../../utils/DateUtils';
import showCustomActionSheet, {
  ActionSheetOption,
} from '../../utils/showCustomActionSheet';
import ReminderService from '../services/ReminderService';
import ReminderStatusChip from './ReminderStatusChip';

type Props = {
  reminder: ReminderDto;
  openEditModal?: (reminder: ReminderDto) => void;
  refetch: () => void;
};

const ReminderItem = ({
  reminder,
  openEditModal,
  refetch: refetchReminders,
}: Props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { colors } = useColors();

  const handleUpdateStatus = (status: ReminderStatus) => {
    ReminderService.update(reminder.id, { status })
      .then(() => refetchReminders())
      .catch((error) => console.error(error));
  };

  const handleDelete = () => {
    ReminderService.remove(reminder.id)
      .then(() => refetchReminders())
      .catch((error) => console.error(error));
  };

  const handleLongPress = () => {
    const options: ActionSheetOption[] = [
      {
        label: 'Start',
        onPress: () => handleUpdateStatus(ReminderStatus.IN_PROGRESS),
        shouldRender: () =>
          reminder.status === ReminderStatus.TODO ||
          reminder.status === ReminderStatus.CANCELED,
      },
      {
        label: 'Complete',
        onPress: () => handleUpdateStatus(ReminderStatus.DONE),
        shouldRender: () => reminder.status === ReminderStatus.IN_PROGRESS,
      },
      {
        label: 'Cancel',
        onPress: () => handleUpdateStatus(ReminderStatus.CANCELED),
        shouldRender: () => reminder.status !== ReminderStatus.CANCELED,
      },
      {
        label: 'Edit',
        onPress: () => openEditModal?.(reminder),
      },
      {
        label: 'Delete',
        onPress: () => handleDelete(),
        isDestructive: true,
      },
      {
        label: 'Close',
        onPress: () => {
          /* Do nothing */
        },
        isCancel: true,
      },
    ];

    showCustomActionSheet(
      {
        options,
        title: 'Reminder Actions',
        message: 'Select an option to manage your reminder.',
        tintColor: colors.primary,
      },
      showActionSheetWithOptions
    );
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onLongPress={handleLongPress}>
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{reminder.title}</Text>
          <Text>{DateUtils.formatDate(reminder.expiresAt)}</Text>
        </View>
        <Text style={styles.content}>{reminder.content}</Text>
        <View style={styles.bottomContainer}>
          <Text>{reminder.folder?.name}</Text>
          <ReminderStatusChip style={styles.status} status={reminder.status} />
        </View>
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
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
  },
  status: {
    alignSelf: 'flex-end',
  },
});
