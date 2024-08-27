import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const ReminderAddButton = () => {
  return (
    <FAB
      style={styles.container}
      icon="plus"
      onPress={() => console.log('Pressed')}
    />
  );
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
