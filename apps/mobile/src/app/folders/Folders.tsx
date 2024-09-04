import React from 'react';
import { StyleSheet } from 'react-native';
import FolderList from './FolderList';

const Folders = () => {
  return <FolderList flatListStyle={styles.flatListStyle} horizontal={false} />;
};

export default Folders;

const styles = StyleSheet.create({
  flatListStyle: {},
});
