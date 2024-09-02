import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
  size?: 'small' | 'large' | number;
};

const ActivityIndicator = ({ children, isLoading, size = 'large' }: Props) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  if (isLoading) {
    return (
      <View onLayout={onLayout}>
        {children}
        <View
          style={[
            styles.container,
            { width: dimensions.width, height: dimensions.height },
          ]}
        />
      </View>
    );
  }

  return children;
};

export default ActivityIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
