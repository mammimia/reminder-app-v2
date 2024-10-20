import {
  CreatePaymentTypeDto,
  PaymentPeriod,
  PaymentTypeDto,
  UpdatePaymentTypeDto,
} from '@mammimia/types';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Modal, TextInput } from 'react-native-paper';
import StringUtils from '../../..//utils/StringUtils';
import Picker from '../../../components/Picker';
import useEditorModalActions from '../../../hooks/useEditorModalActions';
import PaymentTypeService from '../../services/PaymentTypeService';

type Props = {
  defaultValues?: PaymentTypeDto | null;
  visible: boolean;
  hideModal: () => void;
  refetch: () => void;
};

const PaymentTypeEditorModal = ({
  defaultValues,
  visible,
  hideModal,
  refetch,
}: Props) => {
  const { isOperating, isEditing, handleFormSubmit } = useEditorModalActions({
    service: PaymentTypeService,
    refetch,
    hideModal,
    defaultValues,
    createSchema: CreatePaymentTypeDto,
    updateSchema: UpdatePaymentTypeDto,
  });

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={styles.containerStyle}
    >
      <Text style={styles.formTitle}>Payment Type Editor</Text>
      <Formik
        initialValues={
          defaultValues || {
            name: '',
            period: PaymentPeriod.MONTHLY,
            color: '#000000',
          }
        }
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            <TextInput
              label="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            <Picker
              label="Period"
              value={values.period}
              items={Object.values(PaymentPeriod).map((period) => ({
                label: StringUtils.convertToTitleCase(period),
                value: period,
              }))}
              handleChange={handleChange('period')}
            />
            <TextInput
              label="Color"
              onChangeText={handleChange('color')}
              onBlur={handleBlur('color')}
              value={values.color}
            />
            <Button
              onPress={() => handleSubmit()}
              loading={isOperating}
              disabled={isOperating}
            >
              {isEditing ? 'Edit' : 'Create'} Payment
            </Button>
          </View>
        )}
      </Formik>
    </Modal>
  );
};

export default PaymentTypeEditorModal;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formContainer: {
    gap: 10,
  },
});
