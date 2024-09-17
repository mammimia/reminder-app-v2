import { useActionSheet } from '@expo/react-native-action-sheet';
import { ReminderDto, ReminderStatus } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';
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
  const { colors, styles } = useStyles(createStyles);

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
          <Text style={styles.content}>
            {DateUtils.formatDate(reminder.expiresAt)}
          </Text>
        </View>
        <Text style={styles.content}>{reminder.content}</Text>
        <View style={styles.bottomContainer}>
          <View style={styles.folder}>
            <View
              style={[
                styles.folderColorCircle,
                {
                  backgroundColor: reminder?.folder?.color || colors.orange500,
                },
              ]}
            />
            <Text style={styles.content}>
              {reminder.folder?.name || 'General'}
            </Text>
          </View>
          <ReminderStatusChip style={styles.status} status={reminder.status} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReminderItem;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.gray300,
      borderWidth: 1,
      borderColor: colors.darkblue900,
      borderRadius: 10,
      margin: 10,
      paddingTop: 5,
      paddingBottom: 10,
      paddingHorizontal: 10,
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.darkblue900,
    },
    content: {
      fontSize: 13,
      color: colors.darkblue900,
    },
    status: {
      alignSelf: 'flex-end',
    },
    folder: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    folderColorCircle: {
      width: 16,
      height: 16,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
