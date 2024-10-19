import { useActionSheet } from '@expo/react-native-action-sheet';
import { PaymentTypeDto } from '@mammimia/types';
import { TColors, useStyles } from '@mammimia/ui';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import showCustomActionSheet, {
  ActionSheetOption,
} from '../../../utils/showCustomActionSheet';
import ColorCircle from '../../../components/ColorCircle';
import StringUtils from '../../../utils/StringUtils';
import PaymentTypeService from '../../services/PaymentTypeService';

type Props = {
  item: PaymentTypeDto;
  openEditModal?: (paymentType: PaymentTypeDto) => void;
  refetch: () => void;
};

const PaymentTypeItem = ({ item, openEditModal, refetch }: Props) => {
  const { styles, colors } = useStyles(createStyles);
  const { showActionSheetWithOptions } = useActionSheet();

  const handleDelete = () => {
    PaymentTypeService.remove?.(item.id)
      .then(() => refetch())
      .catch((error) => console.error(error));
  };

  const handleLongPress = () => {
    const options: ActionSheetOption[] = [
      {
        label: 'Edit',
        onPress: () => openEditModal?.(item),
      },
      {
        label: 'Delete',
        onPress: () => handleDelete(),
        isDestructive: true,
      },
      {
        label: 'Close',
        onPress: () => {
          /* Do nothing */
        },
        isCancel: true,
      },
    ];

    showCustomActionSheet(
      {
        options,
        title: 'Reminder Actions',
        message: 'Select an option to manage your reminder.',
        tintColor: colors.primary,
      },
      showActionSheetWithOptions
    );
  };

  return (
    <TouchableOpacity onLongPress={handleLongPress}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ColorCircle color={item.color} />
          <Text style={styles.name}>
            {StringUtils.convertToTitleCase(item.name)}
          </Text>
        </View>
        <Text style={styles.period}>
          {StringUtils.convertToTitleCase(item.period)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentTypeItem;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.gray300,
      borderWidth: 1,
      borderColor: colors.darkblue900,
      borderRadius: 10,
      margin: 5,
      padding: 10,
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    innerContainer: {
      gap: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.darkblue900,
    },
    period: {
      fontSize: 13,
      fontStyle: 'italic',
      color: colors.darkblue900,
    },
  });
