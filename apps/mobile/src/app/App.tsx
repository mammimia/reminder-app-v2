/* eslint-disable jsx-a11y/accessible-emoji */
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Folders from './folders/Folders';
import RemindersHome from './reminders/RemindersHome';

const ReminderDrawer = createDrawerNavigator();

function ReminderStackScreen() {
  return (
    <ReminderDrawer.Navigator initialRouteName="Home">
      <ReminderDrawer.Screen name="Home" component={RemindersHome} />
      <ReminderDrawer.Screen name="Details" component={RemindersHome} />
    </ReminderDrawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StatusBar barStyle="dark-content" />
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Reminder"
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={!focused ? 'fish' : 'fish-outline'}
                  color={color}
                  size={size}
                />
              ),
            }}
            component={ReminderStackScreen}
          />
          <Tab.Screen
            name="Expense"
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name="cash-outline" color={color} size={size} />
              ),
            }}
            component={Folders}
          />
          <Tab.Screen
            name="Daily Routine"
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={!focused ? 'calendar' : 'calendar-outline'}
                  color={color}
                  size={size}
                />
              ),
            }}
            component={Folders}
          />
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
