import { ReminderDto, ReminderStatus } from '@mammimia/types';
import React from 'react';
import { StyleSheet } from 'react-native';
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
  openEditModal: (reminder: ReminderDto) => void;
};

const ReminderItemActions = ({
  reminder,
  visible,
  closeMenu,
  anchor,
  itemStatus,
  openEditModal,
}: Props) => {
  const handlePress = (callback: () => void) => {
    callback();
    closeMenu();
  };

  const updateStatus = (status: ReminderStatus) => {
    ReminderService.update(reminder.id, { status })
      .then(() => {
        console.log('Reminder status updated');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={anchor}>
      {itemStatus === ReminderStatus.TODO && (
        <Menu.Item
          onPress={() =>
            handlePress(() => updateStatus(ReminderStatus.IN_PROGRESS))
          }
          title="Start"
        />
      )}
      {itemStatus === ReminderStatus.IN_PROGRESS && (
        <Menu.Item
          onPress={() => handlePress(() => updateStatus(ReminderStatus.DONE))}
          title="Complete"
        />
      )}
      {itemStatus !== ReminderStatus.CANCELED && (
        <Menu.Item
          onPress={() =>
            handlePress(() => updateStatus(ReminderStatus.CANCELED))
          }
          title="Cancel"
        />
      )}
      <Divider />
      <Menu.Item
        onPress={() => handlePress(() => openEditModal(reminder))}
        title="Edit"
      />
    </Menu>
  );
};

export default ReminderItemActions;

const styles = StyleSheet.create({});
