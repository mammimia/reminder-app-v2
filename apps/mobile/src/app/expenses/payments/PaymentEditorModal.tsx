import {
  CreatePaymentDto,
  Currency,
  PaymentDto,
  PaymentMethod,
  PaymentTypeDto,
  TransactionType,
  UpdatePaymentDto,
} from '@mammimia/types';
import useFetchData from '../../../hooks/useFetchData';
import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Modal, TextInput } from 'react-native-paper';
import DateTimePicker from '../../../components/DateTimePicker';
import Picker from '../../../components/Picker';
import useEditorModalActions from '../../../hooks/useEditorModalActions';
import StringUtils from '../../../utils/StringUtils';
import PaymentService from '../../services/PaymentService';
import PaymentTypeService from '../../services/PaymentTypeService';

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

  const { data: paymentTypes } = useFetchData<PaymentTypeDto>({
    fetchMethod: PaymentTypeService.get,
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
      <Text style={styles.formTitle}>Payment Editor</Text>
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
            typeId: paymentTypes?.[0]?.id || '',
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
            <Picker
              label="Payment Method"
              value={values.method}
              items={Object.values(PaymentMethod).map((method) => ({
                label: StringUtils.convertToTitleCase(method),
                value: method,
              }))}
              handleChange={handleChange('method')}
            />
            <Picker
              label="Payment Type"
              value={values.typeId}
              items={paymentTypes?.map((type) => ({
                label: StringUtils.convertToTitleCase(type.name),
                value: type.id,
              }))}
              handleChange={handleChange('typeId')}
            />
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
