import { FolderDto } from '@mammimia/types';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  folder: FolderDto;
};

const FolderSliderItem = ({ folder }: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate('FolderDetails', {
          folderId: folder.id,
          folderName: folder.name,
        });
      }}
    >
      <Text style={styles.folderName}>{folder.name}</Text>
      <Text style={styles.reminderCount}>
        {folder.reminderCount || 0} reminders
      </Text>
      <Text style={styles.categoryText}>
        {folder.category?.name || 'General'}
      </Text>
    </TouchableOpacity>
  );
};

export default FolderSliderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'gray',
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    height: 100,
    width: 150,
  },
  folderName: {
    fontSize: 14,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderCount: {
    fontSize: 12,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  categoryText: {
    fontSize: 12,
    color: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5,
  },
});
