import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CategoryDto } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';
import showCustomActionSheet, {
  ActionSheetOption,
} from '../../utils/showCustomActionSheet';
import { useActionSheet } from '@expo/react-native-action-sheet';
import CategoryService from '../services/CategoryService';

type Props = {
  category: CategoryDto;
  openEditModal?: (category: CategoryDto) => void;
  refetch: () => void;
};

const CategorySliderItem = ({ category, openEditModal, refetch }: Props) => {
  const { styles } = useStyles(createStyles);
  const { showActionSheetWithOptions } = useActionSheet();

  const handleDelete = () => {
    CategoryService.remove?.(category.id)
      .then(() => refetch())
      .catch((error) => console.error(error));
  };

  const handleLongPress = () => {
    const options: ActionSheetOption[] = [
      {
        label: 'Edit',
        onPress: () => openEditModal?.(category),
      },
      {
        label: 'Delete',
        onPress: () => handleDelete(),
        isDestructive: true,
      },
      {
        label: 'Close',
        onPress: () => {
          /* Do nothing */
        },
        isCancel: true,
      },
    ];

    showCustomActionSheet(
      {
        options,
        title: 'Category Actions',
        message: 'Select an option to manage the category.',
      },
      showActionSheetWithOptions
    );
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onLongPress={handleLongPress}>
      <View style={styles.container}>
        <Text style={styles.categoryName}>{category.name}</Text>
      </View>
    </TouchableOpacity>
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
