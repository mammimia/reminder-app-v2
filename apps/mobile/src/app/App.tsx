/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Reminders from './reminders/Reminders';
import Folders from './folders/Folders';

export const App = () => {
  return (
    <PaperProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <Folders />
          <Reminders />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
