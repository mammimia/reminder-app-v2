import {
  CreateReminderDto,
  ReminderDto,
  UpdateReminderDto,
} from '@mammimia/types';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Text, TextInput } from 'react-native-paper';
import ReminderService from '../services/ReminderService';

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
  const [isOperating, setIsOperating] = useState(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  const isEditing = !!defaultValues;

  const handleCreate = (values: CreateReminderDto) => {
    setIsOperating(true);
    try {
      const parsedValues = CreateReminderDto.parse(values);
      ReminderService.create(parsedValues).then(() => {
        hideModal();
        refetchReminders();
        setIsOperating(false);
      });
    } catch (error) {
      console.error(error);
      setIsOperating(false);
    }
  };

  const handleEdit = (values: UpdateReminderDto) => {
    if (!defaultValues) return;

    setIsOperating(true);

    try {
      const parsedValues = UpdateReminderDto.parse(values);
      ReminderService.update(defaultValues.id, parsedValues).then(() => {
        hideModal();
        refetchReminders();
        setIsOperating(false);
      });
    } catch (error) {
      console.error(error);
      setIsOperating(false);
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}
    >
      <Text style={styles.formTitle}>Reminder Editor</Text>
      <Formik
        initialValues={defaultValues || { title: '', content: '' }}
        onSubmit={isEditing ? handleEdit : handleCreate}
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
