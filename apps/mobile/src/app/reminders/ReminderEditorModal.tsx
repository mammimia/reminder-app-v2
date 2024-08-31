import { CreateReminderDto, ReminderDto } from '@mammimia/types';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Text, TextInput } from 'react-native-paper';

type Props = {
  defaultValues?: ReminderDto | null;
  visible: boolean;
  hideModal: () => void;
};

const ReminderEditorModal = ({ defaultValues, visible, hideModal }: Props) => {
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const handleSubmit = (values: CreateReminderDto) => {
    const parsedValues = CreateReminderDto.parse(values);
    console.log(parsedValues);
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
        onSubmit={handleSubmit}
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
            <Button onPress={handleSubmit}>Submit</Button>
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