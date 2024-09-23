import { Ionicons } from '@expo/vector-icons';
import { TColors, useStyles } from '@mammimia/ui';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateUtils from '../../utils/DateUtils';
import DateTimePicker from '../../components/DateTimePicker';

const ReminderCalendar = () => {
  const [date, setDate] = useState<string | undefined>(
    new Date().toISOString()
  );

  const { styles, colors } = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.header}>{DateUtils.formatDate(date)}</Text>
          <Text style={styles.infoText}>10 tasks</Text>
        </View>
        <DateTimePicker
          value={date}
          onChange={(d) => setDate(d)}
          datePickerStyle={{
            position: 'absolute',
            top: 50,
            left: 0,
            right: 0,
            backgroundColor: colors.white,
          }}
        >
          {({ onPress }) => (
            <TouchableOpacity style={styles.calendarButton} onPress={onPress}>
              <Ionicons name="calendar" size={24} color={colors.background} />
            </TouchableOpacity>
          )}
        </DateTimePicker>
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
      position: 'relative',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
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
