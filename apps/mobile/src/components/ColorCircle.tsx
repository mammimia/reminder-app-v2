import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  color: string | undefined;
  size?: number;
};

const ColorCircle = ({ color, size = 16 }: Props) => {
  return (
    <View
      style={[
        styles.colorCircle,
        {
          backgroundColor: color,
          width: size,
          height: size,
        },
      ]}
    />
  );
};

export default ColorCircle;

const styles = StyleSheet.create({
  colorCircle: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
