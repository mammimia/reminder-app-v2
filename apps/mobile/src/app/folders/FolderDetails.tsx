import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
  route: {
    params: {
      folderId: string;
    };
  };
};

const FolderDetails = ({ route }: Props) => {
  const { folderId } = route.params;
  return (
    <View>
      <Text>FolderDetails : {folderId}</Text>
    </View>
  );
};

export default FolderDetails;

const styles = StyleSheet.create({});
