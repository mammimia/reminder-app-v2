import { TColors, useStyles } from '@mammimia/ui';
import DateTimePickerComponent from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DateUtils from '../utils/DateUtils';

type Props = {
  value: string | undefined;
  label: string;
  onChange: (value: string) => void;
};

const DateTimePicker = ({ value, label, onChange }: Props) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { styles } = useStyles(createStyles);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleChange = (
    { type }: { type: string },
    selectedDate: Date | undefined
  ) => {
    if (type === 'set') {
      setDate(selectedDate);

      if (Platform.OS === 'android') {
        toggleDatePicker();
        if (selectedDate) onChange(selectedDate?.toISOString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const handleIOSConfirm = () => {
    if (date) onChange(date.toISOString());
    toggleDatePicker();
  };

  const handleIosCancel = () => {
    setDate(value ? new Date(value) : new Date());
    toggleDatePicker();
  };

  return (
    <>
      <TextInput
        onPress={toggleDatePicker}
        value={
          date
            ? DateUtils.formatDate(date.toISOString()) || undefined
            : undefined
        }
      />
      {showDatePicker && (
        <DateTimePickerComponent
          mode="date"
          display="spinner"
          value={date || new Date()}
          onChange={handleChange}
        />
      )}

      {showDatePicker && Platform.OS === 'ios' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleIOSConfirm}>
            <Button style={[styles.button]}>Done</Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleIosCancel}>
            <Button style={[styles.button]}>Cancel</Button>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DateTimePicker;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    button: {
      padding: 5,
      borderRadius: 50,
      margin: 5,
    },
  });
