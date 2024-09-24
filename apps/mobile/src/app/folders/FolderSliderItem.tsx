import { useActionSheet } from '@expo/react-native-action-sheet';
import { FolderDto } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import showCustomActionSheet, {
  ActionSheetOption,
} from '../../utils/showCustomActionSheet';
import FolderService from '../services/FolderService';

type Props = {
  folder: FolderDto;
  style?: object;
  actionable?: boolean;
  openEditModal?: (folder: FolderDto) => void;
  refetch: () => void;
};

const FolderSliderItem = ({
  folder,
  style,
  actionable,
  openEditModal,
  refetch,
}: Props) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { showActionSheetWithOptions } = useActionSheet();
  const { styles } = useStyles(createStyles);

  const handleDelete = () => {
    FolderService.remove(folder.id)
      .then(() => refetch())
      .catch((error) => console.error(error));
  };

  const handleLongPress = () => {
    if (actionable) {
      const options: ActionSheetOption[] = [
        {
          label: 'Edit',
          onPress: () => openEditModal?.(folder),
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
          title: 'Folder Actions',
          message: 'Select an option to manage the folder.',
        },
        showActionSheetWithOptions
      );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate('FolderDetails', {
          folderId: folder.id,
          folderName: folder.name,
        });
      }}
      onLongPress={handleLongPress}
    >
      <View
        style={[
          styles.folderColorBar,
          {
            backgroundColor: folder.color || 'transparent',
          },
        ]}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.folderName}>{folder.name}</Text>
        <Text style={styles.reminderCount}>
          {folder.reminderCount || 0} reminders
        </Text>
        <Text style={styles.categoryText}>{folder.category?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FolderSliderItem;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.gray300,
      marginBottom: 10,
      marginHorizontal: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colors.darkblue900,
      height: 100,
    },
    innerContainer: {
      flex: 1,
      flexDirection: 'column',
      padding: 10,
    },
    folderColorBar: {
      height: 5,
    },
    folderName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.darkblue900,
    },
    reminderCount: {
      fontSize: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 5,
      color: colors.darkblue900,
    },
    categoryText: {
      fontSize: 12,
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: 5,
      color: colors.darkblue900,
    },
  });
