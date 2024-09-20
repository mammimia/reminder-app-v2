import { Ionicons } from '@expo/vector-icons';
import { TColors, useStyles } from '@mammimia/ui';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateUtils from '../../utils/DateUtils';

const ReminderCalendar = () => {
  const [date, setDate] = useState(new Date());

  const { styles, colors } = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.header}>
            {DateUtils.formatDate(date.toISOString())}
          </Text>
          <Text style={styles.infoText}>10 tasks</Text>
        </View>
        <TouchableOpacity style={styles.calendarButton}>
          <Ionicons name="calendar" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReminderCalendar;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
    },
    infoText: {
      color: colors.primary,
    },
    calendarButton: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 50,
    },
  });
