import {
  CreatePaymentDto,
  Currency,
  PaymentDto,
  PaymentMethod,
  TransactionType,
  UpdatePaymentDto,
} from '@mammimia/types';
import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Modal, TextInput } from 'react-native-paper';
import DateTimePicker from '../../../components/DateTimePicker';
import Picker from '../../../components/Picker';
import useEditorModalActions from '../../../hooks/useEditorModalActions';
import StringUtils from '../../../utils/StringUtils';
import PaymentService from '../../services/PaymentService';

type Props = {
  defaultValues?: PaymentDto | null;
  visible: boolean;
  hideModal: () => void;
  refetch: () => void;
};

const PaymentEditorModal = ({
  defaultValues,
  visible,
  hideModal,
  refetch,
}: Props) => {
  const { isOperating, isEditing, handleFormSubmit } = useEditorModalActions({
    service: PaymentService,
    refetch,
    hideModal,
    defaultValues,
    createSchema: CreatePaymentDto,
    updateSchema: UpdatePaymentDto,
  });

  const submitForm = async (values: any) => {
    const formValues = {
      ...values,
      amount: parseFloat(values.amount),
    };

    await handleFormSubmit(formValues);
  };

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}
    >
      <Text style={styles.formTitle}>Reminder Editor</Text>
      <Formik
        initialValues={
          defaultValues || {
            title: '',
            description: '',
            amount: 0,
            currency: Currency.TL,
            transactionType: TransactionType.EXPENSE,
            paymentDate: new Date().toISOString(),
            method: PaymentMethod.CARD,
            typeId: '',
          }
        }
        onSubmit={submitForm}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            <TextInput
              label="Title"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            <TextInput
              label="Description"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
            />
            <TextInput
              label="Amount"
              onChangeText={handleChange('amount')}
              onBlur={handleBlur('amount')}
              value={values.amount}
            />
            <Picker
              label="Currency"
              value={values.currency}
              items={Object.values(Currency).map((currency) => ({
                label: currency,
                value: currency,
              }))}
              handleChange={handleChange('currency')}
            />
            <Picker
              label="Transaction Type"
              value={values.transactionType}
              items={Object.values(TransactionType).map((type) => ({
                label: StringUtils.convertToTitleCase(type),
                value: type,
              }))}
              handleChange={handleChange('transactionType')}
            />
            <DateTimePicker
              value={values.paymentDate}
              onChange={handleChange('paymentDate')}
            >
              {({ onPress, value }) => (
                <Pressable onPress={onPress}>
                  <TextInput
                    label="Payment Date"
                    value={value}
                    editable={false}
                    onPressIn={onPress}
                  />
                </Pressable>
              )}
            </DateTimePicker>
            <Button
              onPress={handleSubmit}
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

export default PaymentEditorModal;

const styles = StyleSheet.create({
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formContainer: {
    gap: 10,
  },
});
