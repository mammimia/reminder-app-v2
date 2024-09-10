import { FolderDto } from '@mammimia/types';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FolderSliderItem from './FolderSliderItem';

type Props = {
  data: FolderDto[];
  horizontal?: boolean;
  flatListStyle?: object;
  folderItemStyle?: object;
  isFetching: boolean;
  onRefresh: () => void;
  openEditModal?: (reminder: FolderDto) => void;
};

const FolderList = ({
  horizontal = true,
  flatListStyle,
  folderItemStyle,
  data,
  isFetching,
  onRefresh: refetch,
}: Props) => {
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
