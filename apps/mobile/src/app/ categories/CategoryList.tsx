import { CategoryDto } from '@mammimia/types';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import useFetchData from '../../hooks/useFetchData';
import CategoryService from '../services/CategoryService';
import CategorySliderItem from './CategorySliderItem';

const CategoryList = () => {
  const { data, isFetching, refetch } = useFetchData<CategoryDto>({
    fetchMethod: CategoryService.get,
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <CategorySliderItem category={item} />}
        keyExtractor={(item) => item.id}
        onRefresh={refetch}
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
