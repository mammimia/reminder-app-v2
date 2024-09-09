import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

type Props = {
  onPress: () => void;
};

const AddFab = ({ onPress }: Props) => (
  <FAB style={styles.container} icon="plus" onPress={onPress} />
);
export default AddFab;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    margin: 5,
    borderRadius: 50,
  },
});
