import { ReminderStatus } from '@mammimia/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Menu } from 'react-native-paper';

type Props = {
  visible: boolean;
  closeMenu: () => void;
  anchor: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  itemStatus: ReminderStatus;
  openEditModal: () => void;
};

const ReminderItemActions = ({
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

  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={anchor}>
      {itemStatus === ReminderStatus.TODO && (
        <Menu.Item onPress={() => {}} title="Start" />
      )}
      {itemStatus === ReminderStatus.IN_PROGRESS && (
        <Menu.Item onPress={() => {}} title="Complete" />
      )}
      {itemStatus === ReminderStatus.CANCELED && (
        <Menu.Item onPress={() => {}} title="Cancel" />
      )}
      <Divider />
      <Menu.Item onPress={() => handlePress(openEditModal)} title="Edit" />
    </Menu>
  );
};

export default ReminderItemActions;

const styles = StyleSheet.create({});
