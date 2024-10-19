import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActivityOverlay from '../ActivityIndicator';

type Props = {
  isFetching: boolean;
  children: React.ReactNode;
};

const ListPageContainer = ({ isFetching, children }: Props) => {
  return (
    <ActivityOverlay isLoading={isFetching}>
      <View style={styles.container}>{children}</View>
    </ActivityOverlay>
  );
};

export default ListPageContainer;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
});
