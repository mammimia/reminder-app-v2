import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, TextInput } from 'react-native-paper';
import { DollarRateStorage } from '../../storages/DollarRateStorage';
import { TColors, useStyles } from '@mammimia/ui';

type Props = {
  modalVisible: boolean;
  hideModal: () => void;
  dollarRate: number;
  setDollarRate: (rate: number) => void;
};

const DollarRateModal = ({
  modalVisible,
  hideModal,
  dollarRate,
  setDollarRate,
}: Props) => {
  const [newRate, setNewRate] = useState<string>(dollarRate.toFixed(2));
  const { styles } = useStyles(createStyles);

  return (
    <Portal>
      <Modal visible={modalVisible} onDismiss={hideModal}>
        <View style={styles.dollarModalContainer}>
          <TextInput
            label="Dollar Rate"
            value={newRate.toString()}
            onChangeText={(text) => setNewRate(text)}
            placeholder="Enter a numeric value"
          />
          <Button
            onPress={() => {
              const newDollarRate = parseFloat(newRate);
              DollarRateStorage.saveDollarRate(newDollarRate);
              setDollarRate(newDollarRate);
              hideModal();
            }}
          >
            Save Dollar Rate
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default DollarRateModal;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    dollarModalContainer: {
      backgroundColor: colors.white,
      padding: 20,
      margin: 20,
    },
  });
