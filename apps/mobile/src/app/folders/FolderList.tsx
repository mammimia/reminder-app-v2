import { FolderDto } from '@mammimia/types';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FolderService from '../services/FolderService';
import FolderSliderItem from './FolderSliderItem';

type Props = {
  horizontal?: boolean;
  flatListStyle?: object;
  folderItemStyle?: object;
};

const FolderList = ({
  horizontal = true,
  flatListStyle,
  folderItemStyle,
}: Props) => {
  const [folders, setFolders] = useState<FolderDto[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getFolders = async () => {
    setIsFetching(true);
    try {
      const response = await FolderService.get();
      setFolders(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    getFolders();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Folders</Text>
      <FlatList
        style={flatListStyle}
        data={folders}
        renderItem={({ item }) => (
          <FolderSliderItem folder={item} style={folderItemStyle} />
        )}
        keyExtractor={(item) => item.id}
        horizontal={horizontal}
        onRefresh={getFolders}
        refreshing={isFetching}
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
