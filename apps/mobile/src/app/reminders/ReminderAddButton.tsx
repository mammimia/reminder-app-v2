import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

type Props = {
  openModal: () => void;
};

const ReminderAddButton = ({ openModal }: Props) => {
  const handlePress = () => {
    openModal();
  };

  return <FAB style={styles.container} icon="plus" onPress={handlePress} />;
};

export default ReminderAddButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    margin: 5,
    borderRadius: 50,
  },
});
