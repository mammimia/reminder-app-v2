import { Ionicons } from '@expo/vector-icons';
import { TColors, useStyles } from '@mammimia/ui';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '../../components/DateTimePicker';
import DateUtils from '../../utils/DateUtils';

const ReminderCalendar = () => {
  const [date, setDate] = useState<string>(new Date().toISOString());

  const { styles, colors } = useStyles(createStyles);

  const week = DateUtils.getWeek(date);

  const handleDayPress = (day: string) => {
    setDate(day);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.header}>
            {DateUtils.formatDate(date, 'dd MMM yyyy, EEEE')}
          </Text>
          <Text style={styles.infoText}>10 tasks</Text>
        </View>
        <DateTimePicker
          value={date}
          onChange={(d) => setDate(d)}
          datePickerStyle={{
            flex: 1,
          }}
        >
          {({ onPress }) => (
            <TouchableOpacity style={styles.calendarButton} onPress={onPress}>
              <Ionicons name="calendar" size={24} color={colors.background} />
            </TouchableOpacity>
          )}
        </DateTimePicker>
      </View>

      <FlatList
        contentContainerStyle={styles.dayContainer}
        data={week}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => {
          const isSameDay = DateUtils.isSameDay(date, item.date);
          return (
            <TouchableOpacity onPress={() => handleDayPress(item.date)}>
              <View style={[styles.dayItem, isSameDay && styles.selectedDay]}>
                <Text
                  style={[
                    styles.dayItemText,
                    isSameDay && styles.selectedDayText,
                  ]}
                >
                  {item.dayOfWeek}
                </Text>
                <Text
                  style={[
                    styles.dayItemText,
                    isSameDay && styles.selectedDayText,
                  ]}
                >
                  {DateUtils.formatDate(item.date, 'dd')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        horizontal
      />
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
      marginBottom: 20,
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
    dayContainer: {
      flex: 1,
      justifyContent: 'space-between',
      marginHorizontal: 10,
      height: 50,
    },
    dayItem: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 45,
      padding: 5,
    },
    dayItemText: {
      color: colors.text,
      opacity: 0.6,
    },
    selectedDay: {
      backgroundColor: colors.primary,
      borderRadius: 50,
    },
    selectedDayText: {
      color: colors.white,
      fontWeight: 'bold',
      opacity: 1,
    },
  });
