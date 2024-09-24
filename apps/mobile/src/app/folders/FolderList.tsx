import { FolderDto } from '@mammimia/types';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
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
  openEditModal,
}: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={flatListStyle}
        data={data}
        renderItem={({ item }) => (
          <FolderSliderItem
            folder={item}
            style={folderItemStyle}
            actionable={!horizontal}
            openEditModal={openEditModal}
            refetch={refetch}
          />
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
