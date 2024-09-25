/* eslint-disable jsx-a11y/accessible-emoji */
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from '@mammimia/ui';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Categories from './ categories/Categories';
import FolderDetails from './folders/FolderDetails';
import FolderList from './folders/FolderList';
import Folders from './folders/Folders';
import ReminderCalendar from './reminders/ReminderCalendar';
import Reminders from './reminders/Reminders';
import RemindersHome from './reminders/RemindersHome';

const ReminderStack = createStackNavigator();

function ReminderStackScreen() {
  return (
    <ReminderStack.Navigator initialRouteName="Home">
      <ReminderStack.Screen
        name="Home"
        component={RemindersHome}
        options={{
          headerShown: false,
        }}
      />
      <ReminderStack.Screen
        name="Folders"
        component={Folders}
        options={({ navigation }) => ({
          headerRight: (props) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Categories');
              }}
            >
              <Ionicons
                style={{
                  paddingRight: 25,
                }}
                name="pricetags-outline"
                size={24}
                color={props.tintColor}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <ReminderStack.Screen name="FolderDetails" component={FolderDetails} />
      <ReminderStack.Screen name="Categories" component={Categories} />
      <ReminderStack.Screen name="Reminders" component={Reminders} />
      <ReminderStack.Screen
        name="ReminderCalendar"
        component={ReminderCalendar}
      />
    </ReminderStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <ActionSheetProvider>
          <ThemeProvider>
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
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="cash-outline" color={color} size={size} />
                  ),
                }}
                component={FolderList}
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
                component={FolderList}
              />
            </Tab.Navigator>
          </ThemeProvider>
        </ActionSheetProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
