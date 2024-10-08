import { CategoryDto } from '@mammimia/types';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CategorySliderItem from './CategorySliderItem';

type Props = {
  data: CategoryDto[];
  isFetching: boolean;
  onRefresh: () => void;
  openEditModal?: (category: CategoryDto) => void;
};

const CategoryList = ({
  data,
  isFetching,
  onRefresh,
  openEditModal,
}: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CategorySliderItem
            category={item}
            openEditModal={openEditModal}
            refetch={onRefresh}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={onRefresh}
        refreshing={isFetching}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
});
