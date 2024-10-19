import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  color: string | undefined;
};

const ColorCircle = ({ color }: Props) => {
  return (
    <View
      style={[
        styles.colorCircle,
        {
          backgroundColor: color,
        },
      ]}
    />
  );
};

export default ColorCircle;

const styles = StyleSheet.create({
  colorCircle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
