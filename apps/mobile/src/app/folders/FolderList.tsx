import { FolderDto } from '@mammimia/types';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import useFetchData from '../../hooks/useFetchData';
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
  const { data, isFetching, refetch } = useFetchData<FolderDto>({
    fetchMethod: FolderService.get,
  });

  return (
    <View style={styles.container}>
      <Text>Folders</Text>
      <FlatList
        style={flatListStyle}
        data={data}
        renderItem={({ item }) => (
          <FolderSliderItem folder={item} style={folderItemStyle} />
        )}
        keyExtractor={(item) => item.id}
        horizontal={horizontal}
        onRefresh={refetch}
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
