import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CategoryDto } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';

type Props = {
  category: CategoryDto;
};

const CategorySliderItem = ({ category }: Props) => {
  const { styles } = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.categoryName}>{category.name}</Text>
    </View>
  );
};

export default CategorySliderItem;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.secondary,
      padding: 10,
      marginBottom: 10,
      marginHorizontal: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'black',
      borderRadius: 10,
      height: 50,
    },
    categoryName: {
      color: colors.text,
    },
  });
