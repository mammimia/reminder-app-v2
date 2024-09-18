import { TColors, useStyles } from '@mammimia/ui';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';

type Props = {
  reminderCount: number;
};

const ReminderHeaderBar = ({ reminderCount }: Props) => {
  const { styles } = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Hi Mammimia,</Text>
        <Text style={styles.infoText}>
          Today you have {reminderCount} todos.
        </Text>
      </View>
      <Avatar.Text style={styles.avatar} label="MA" size={36} />
    </View>
  );
};

export default ReminderHeaderBar;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'ios' ? 64 : 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
    },
    infoText: {
      fontSize: 14,
      color: colors.primary,
      opacity: 0.7,
    },
    avatar: {
      backgroundColor: colors.primary,
    },
  });
