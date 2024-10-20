import { TColors, useStyles } from '@mammimia/ui';
import { Picker as RNPicker } from '@react-native-picker/picker';

import React, { ChangeEvent, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Portal, Text, TextInput } from 'react-native-paper';

type PickerItem = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  handleChange: (e: string | ChangeEvent<any>) => void;
  items: PickerItem[];
  value: string | undefined;
};

const Picker = ({ label, value, items, handleChange }: Props) => {
  const { styles } = useStyles(createStyles);

  if (Platform.OS === 'ios') {
    const selectedValue = items.find((item) => item.value === value);
    return (
      <IOSPicker
        label={label}
        value={selectedValue?.label || ''}
        items={items}
        handleChange={(value) => handleChange(value ?? '')}
      />
    );
  }

  return (
    <RNPicker
      style={styles.androidPickerContainer}
      selectedValue={value}
      onValueChange={(itemValue) => handleChange(itemValue)}
    >
      {items.map((item) => (
        <RNPicker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </RNPicker>
  );
};

type IOSPickerProps = {
  label: string;
  value: string;
  items: PickerItem[];
  handleChange: (value: string | null) => void;
};

const IOSPicker = ({ label, value, items, handleChange }: IOSPickerProps) => {
  const { styles } = useStyles(createStyles);
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDone = () => {
    setVisible(false);
    handleChange(selectedValue);
  };

  return (
    <>
      <TextInput
        label={label}
        editable={false}
        onPress={() => setVisible(true)}
        value={value}
      />
      {visible && (
        <Portal>
          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'white',
            }}
          >
            <RNPicker
              selectedValue={selectedValue}
              onValueChange={(value) => setSelectedValue(value)}
            >
              {items.map((item) => (
                <RNPicker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </RNPicker>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleDone}>
                <Button style={[styles.button]}>
                  <Text style={styles.successButtonText}>Done</Text>
                </Button>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel}>
                <Button style={[styles.button]}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        </Portal>
      )}
    </>
  );
};

export default Picker;

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
    androidPickerContainer: {
      width: '100%',
      backgroundColor: colors.red100, // TODO: Need a proper color
    },
  });
