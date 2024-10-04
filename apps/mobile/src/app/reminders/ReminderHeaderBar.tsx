import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import HeaderBar from '../../components/HeaderBar';

type Props = {
  reminderCount: number;
};

const ReminderHeaderBar = ({ reminderCount }: Props) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handlePress = () => {
    navigation.navigate('ReminderCalendar');
  };

  return (
    <HeaderBar
      mainText="Hi Mammimia,"
      subText={`Today you have ${reminderCount} todos`}
      icon="calendar-outline"
      handlePress={handlePress}
    />
  );
};

export default ReminderHeaderBar;
