import React from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  text: string;
};

const ListEmptyComponent = ({ text }: Props) => {
  return <Text style={styles.listEmptyComponent}>{text}</Text>;
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  listEmptyComponent: {
    textAlign: 'center',
    fontSize: 20,
    color: 'gray',
    marginTop: 20,
  },
});
