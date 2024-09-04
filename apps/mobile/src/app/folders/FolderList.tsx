import { FolderDto } from '@mammimia/types';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AxiosService from '../services/AxiosService';
import FolderSliderItem from './FolderSliderItem';

const FolderList = () => {
  const [folders, setFolders] = useState<FolderDto[]>([]);

  useEffect(() => {
    AxiosService.get<FolderDto[]>('folders')
      .then((response) => setFolders(response.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Folders</Text>
      <FlatList
        data={folders}
        renderItem={({ item }) => <FolderSliderItem folder={item} />}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};

export default FolderList;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
});
