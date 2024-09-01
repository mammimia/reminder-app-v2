import { ReminderDto } from '@mammimia/types';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReminderItemActions from './ReminderItemActions';

type Props = {
  reminder: ReminderDto;
  openEditModal: (reminder: ReminderDto) => void;
};

const ReminderItem = ({ reminder, openEditModal }: Props) => {
  const itemRef = useRef<TouchableOpacity>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const setVisibility = (visibility: boolean) => {
    setIsMenuVisible(visibility);
  };

  const handleLongPress = () => {
    if (!itemRef.current) {
      return;
    }

    itemRef.current.measure((fx, fy, width, height, px, py) => {
      setAnchorPosition({ x: px + width, y: py + height, width, height });
      setVisibility(true);
    });
  };

  return (
    <>
      <TouchableOpacity
        ref={itemRef}
        activeOpacity={0.6}
        onLongPress={handleLongPress}
      >
        <View style={styles.container}>
          <Text>Title: {reminder.title}</Text>
          <Text>Content: {reminder.content}</Text>
          <Text>Due Date: {reminder.expiresAt} </Text>
          <Text>Folder: {reminder.folder?.name}</Text>
          <Text>Status: {reminder.status}</Text>
        </View>
      </TouchableOpacity>
      {anchorPosition && (
        <ReminderItemActions
          reminder={reminder}
          visible={isMenuVisible}
          closeMenu={() => setVisibility(false)}
          anchor={anchorPosition}
          itemStatus={reminder.status}
          openEditModal={openEditModal}
        />
      )}
    </>
  );
};

export default ReminderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    margin: 10,
    padding: 10,
  },
});
