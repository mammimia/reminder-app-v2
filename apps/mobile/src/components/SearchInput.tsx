import { Ionicons } from '@expo/vector-icons';
import { TColors, useStyles } from '@mammimia/ui';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
  text: string;
  setText: (text: string) => void;
  handleEnter?: () => void;
};

const SearchInput = ({ text, setText, handleEnter }: Props) => {
  const { colors, styles } = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <Ionicons name="search" color={colors.indigo500} size={24} />
      <TextInput
        placeholder="Search"
        placeholderTextColor={colors.indigo200}
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleEnter}
      />
    </View>
  );
};

export default SearchInput;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: colors.gray300,
      borderRadius: 50,
      marginVertical: 10,
      marginHorizontal: 20,
    },
    input: {
      flex: 1,
      fontSize: 16,
      marginLeft: 10,
      color: colors.indigo500,
    },
  });
