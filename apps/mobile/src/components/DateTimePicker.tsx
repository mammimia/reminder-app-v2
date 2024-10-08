import { TColors, useStyles } from '@mammimia/ui';
import DateTimePickerComponent from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Button, Portal, Text } from 'react-native-paper';
import DateUtils from '../utils/DateUtils';

type Props = {
  value: string | undefined;
  onChange: (value: string) => void;
  children?: (props: { onPress: () => void; value: string }) => React.ReactNode;
  datePickerStyle?: StyleProp<ViewStyle>;
};

const DateTimePicker = ({
  children,
  value,
  onChange,
  datePickerStyle,
}: Props) => {
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : new Date()
  );
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
      {children &&
        children({
          onPress: toggleDatePicker,
          value: date ? DateUtils.formatDate(date?.toISOString()) ?? '' : '',
        })}
      {showDatePicker && (
        <Portal>
          <View
            style={[
              datePickerStyle,
              { display: showDatePicker ? 'flex' : 'none' },
              Platform.OS === 'ios' && styles.iosDatePickerContainer,
            ]}
          >
            <DateTimePickerComponent
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              value={date || new Date()}
              onChange={handleChange}
            />
            {Platform.OS === 'ios' && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleIOSConfirm}>
                  <Button style={[styles.button]}>
                    <Text style={styles.successButtonText}>Done</Text>
                  </Button>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleIosCancel}>
                  <Button style={[styles.button]}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </Button>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Portal>
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
    successButtonText: {
      color: colors.text,
    },
    cancelButtonText: {
      color: colors.text,
    },
    iosDatePickerContainer: {
      position: 'absolute',
      bottom: 0,
      color: colors.text,
      backgroundColor: colors.yellow500,
      width: '100%',
    },
  });
