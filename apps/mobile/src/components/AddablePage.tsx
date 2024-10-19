import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddFab from './AddFab';

type Props = {
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
};

const AddablePage = ({ children, onPress, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      {children}
      <AddFab onPress={() => onPress()} />
    </View>
  );
};

export default AddablePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
});
