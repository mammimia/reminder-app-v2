/* eslint-disable react-hooks/exhaustive-deps */
import { Ionicons } from '@expo/vector-icons';
import { ReminderDto } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '../../components/DateTimePicker';
import useFetchData from '../../hooks/useFetchData';
import DateUtils from '../../utils/DateUtils';
import ReminderService from '../services/ReminderService';
import ReminderList from './ReminderList';

const ReminderCalendar = () => {
  const [date, setDate] = useState<string>(new Date().toISOString());
  const { data, isFetching, refetch } = useFetchData<ReminderDto>({
    fetchMethod: ReminderService.get,
    params: {
      expiresAt: {
        lte: DateUtils.getEndOfDay(new Date(date)),
        gte: DateUtils.getStartOfDay(new Date(date)),
      },
    },
  });

  const { styles, colors } = useStyles(createStyles);

  const week = DateUtils.getWeek(date);

  const handleDayPress = (day: string) => {
    setDate(day);
  };

  useEffect(() => {
    refetch();
  }, [date]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.header}>
            {DateUtils.formatDate(date, 'dd MMM yyyy, EEEE')}
          </Text>
          <Text style={styles.infoText}>{data.length} tasks</Text>
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
        style={styles.flatList}
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
      <ReminderList
        reminders={data}
        isFetching={isFetching}
        onRefresh={refetch}
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
    flatList: {
      flexGrow: 0,
    },
    dayContainer: {
      flex: 1,
      justifyContent: 'space-between',
      marginHorizontal: 10,
      height: 60,
    },
    dayItem: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 45,
      paddingVertical: 8,
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
