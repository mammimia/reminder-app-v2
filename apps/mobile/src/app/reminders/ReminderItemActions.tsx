import { ReminderDto, ReminderStatus } from '@mammimia/types';
import React from 'react';
import { Divider, Menu } from 'react-native-paper';
import ReminderService from '../services/ReminderService';

type Props = {
  reminder: ReminderDto;
  visible: boolean;
  closeMenu: () => void;
  anchor: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  itemStatus: ReminderStatus;
  openEditModal?: (reminder: ReminderDto) => void;
  refetchReminders: () => void;
};

const ReminderItemActions = ({
  reminder,
  visible,
  closeMenu,
  anchor,
  itemStatus,
  openEditModal,
  refetchReminders,
}: Props) => {
  const handlePress = (callback: () => void) => {
    callback();
    closeMenu();
  };

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

  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={anchor}>
      {itemStatus === ReminderStatus.TODO ||
        (itemStatus === ReminderStatus.CANCELED && (
          <Menu.Item
            onPress={() =>
              handlePress(() => handleUpdateStatus(ReminderStatus.IN_PROGRESS))
            }
            title="Start"
            leadingIcon="play"
          />
        ))}
      {itemStatus === ReminderStatus.IN_PROGRESS && (
        <Menu.Item
          onPress={() =>
            handlePress(() => handleUpdateStatus(ReminderStatus.DONE))
          }
          title="Complete"
          leadingIcon="check"
        />
      )}
      {itemStatus !== ReminderStatus.CANCELED && (
        <Menu.Item
          onPress={() =>
            handlePress(() => handleUpdateStatus(ReminderStatus.CANCELED))
          }
          title="Cancel"
          leadingIcon="cancel"
        />
      )}
      <Divider />
      <Menu.Item
        onPress={() => handlePress(() => openEditModal?.(reminder))}
        title="Edit"
        leadingIcon="pencil"
      />
      <Menu.Item
        onPress={() => handlePress(handleDelete)}
        title="Delete"
        leadingIcon="delete"
      />
    </Menu>
  );
};

export default ReminderItemActions;
