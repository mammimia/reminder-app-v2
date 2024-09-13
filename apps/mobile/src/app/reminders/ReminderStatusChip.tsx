import { ReminderStatus } from '@mammimia/types';
import { useColors } from '@mammimia/ui';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  style: any;
  status: ReminderStatus;
};

const ReminderStatusChip = ({ style, status }: Props) => {
  const { colors } = useColors();

  const getStatusDetails = (status: ReminderStatus) => {
    switch (status) {
      case ReminderStatus.TODO:
        return { color: colors.primary, icon: 'calendar-clear-outline' };
      case ReminderStatus.IN_PROGRESS:
        return { color: colors.warning, icon: 'timer-outline' };
      case ReminderStatus.DONE:
        return { color: colors.success, icon: 'checkmark-circle-outline' };
      case ReminderStatus.CANCELED:
        return { color: colors.error, icon: 'ban-outline' };
      default:
        return { color: colors.text, icon: 'alert-circle-outline' };
    }
  };

  const { color, icon } = getStatusDetails(status);

  return (
    <View style={[style, styles.container, { backgroundColor: color }]}>
      <View style={styles.container}>
        <Icon name={icon} size={16} color={colors.white} />
        <Text style={styles.text}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 50,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ReminderStatusChip;
