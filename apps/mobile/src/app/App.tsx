/* eslint-disable jsx-a11y/accessible-emoji */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Folders from './folders/Folders';
import Reminders from './reminders/Reminders';
import RemindersHome from './reminders/RemindersHome';

const Tab = createBottomTabNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StatusBar barStyle="dark-content" />
        <Tab.Navigator>
          <Tab.Screen name="Reminders" component={RemindersHome} />
          <Tab.Screen name="Folders" component={Folders} />
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
