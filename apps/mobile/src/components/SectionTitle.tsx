import { TColors, useStyles } from '@mammimia/ui';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  handleSeeAll: () => void;
};

const SectionTitle = ({ title, handleSeeAll }: Props) => {
  const { styles } = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleSeeAll}>
        <Text style={styles.seeAll}>See all</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionTitle;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 50,
      marginTop: 10,
      marginHorizontal: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary,
    },
    seeAll: {
      color: colors.primary,
    },
  });
