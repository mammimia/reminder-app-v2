import {
  CreateReminderDto,
  FolderDto,
  ReminderDto,
  UpdateReminderDto,
} from '@mammimia/types';
import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Modal, Text, TextInput } from 'react-native-paper';
import DateTimePicker from '../../components/DateTimePicker';
import Picker from '../../components/Picker';
import useEditorModalActions from '../../hooks/useEditorModalActions';
import useFetchData from '../../hooks/useFetchData';
import FolderService from '../services/FolderService';
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
  const { isOperating, isEditing, handleFormSubmit } = useEditorModalActions({
    service: ReminderService,
    refetch: refetchReminders,
    hideModal,
    defaultValues,
    createSchema: CreateReminderDto,
    updateSchema: UpdateReminderDto,
  });

  const { data } = useFetchData<FolderDto>({
    fetchMethod: FolderService.get,
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
            folderId: data?.[0]?.id || '',
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
              {({ onPress, value }) => (
                <Pressable onPress={onPress}>
                  <TextInput
                    label="Expires At"
                    value={value}
                    editable={false}
                    onPressIn={onPress}
                  />
                </Pressable>
              )}
            </DateTimePicker>

            <Picker
              label="Folder"
              value={values.folderId}
              items={data?.map((folder) => ({
                label: folder.name,
                value: folder.id,
              }))}
              handleChange={handleChange('folderId')}
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
