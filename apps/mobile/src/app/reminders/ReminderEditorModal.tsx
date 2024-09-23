import {
  CreateReminderDto,
  ReminderDto,
  UpdateReminderDto,
} from '@mammimia/types';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Text, TextInput } from 'react-native-paper';
import useEditorModalActions from '../../hooks/useEditorModalActions';
import ReminderService from '../services/ReminderService';
import DateTimePicker from '../../components/DateTimePicker';

type Props = {
  defaultValues?: ReminderDto | null;
  visible: boolean;
  hideModal: () => void;
  refetchReminders: () => void;
};

const ReminderEditorModal = ({
  defaultValues,
  visible,
  hideModal,
  refetchReminders,
}: Props) => {
  const { isOperating, isEditing, handleFormSubmit } = useEditorModalActions({
    service: ReminderService,
    refetch: refetchReminders,
    hideModal,
    defaultValues,
    createSchema: CreateReminderDto,
    updateSchema: UpdateReminderDto,
  });

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
            content: '',
            expiresAt: new Date().toISOString(),
          }
        }
        onSubmit={handleFormSubmit}
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
              label="Content"
              onChangeText={handleChange('content')}
              onBlur={handleBlur('content')}
              value={values.content}
            />
            <DateTimePicker
              value={values.expiresAt}
              onChange={handleChange('expiresAt')}
            >
              <TextInput
                label="Expires At"
                value={values.expiresAt}
                editable={false}
              />
            </DateTimePicker>

            <Button
              onPress={handleSubmit}
              loading={isOperating}
              disabled={isOperating}
            >
              {isEditing ? 'Edit' : 'Create'} Reminder
            </Button>
          </View>
        )}
      </Formik>
    </Modal>
  );
};

export default ReminderEditorModal;

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
