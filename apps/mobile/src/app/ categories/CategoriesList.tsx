import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CategoryDto } from '@mammimia/types';
import CategoryService from '../services/CategoryService';
import CategorySliderItem from './CategorySliderItem';

const CategoriesList = () => {
  const [categories, setFolders] = useState<CategoryDto[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getCategories = async () => {
    setIsFetching(true);
    try {
      const response = await CategoryService.get();
      setFolders(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategorySliderItem category={item} />}
        keyExtractor={(item) => item.id}
        onRefresh={getCategories}
        refreshing={isFetching}
      />
    </View>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
});
