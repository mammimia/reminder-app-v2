import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@mammimia/types';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Text, TextInput } from 'react-native-paper';
import useEditorModalActions from '../../hooks/useEditorModalActions';
import CategoryService from '../services/CategoryService';

type Props = {
  defaultValues?: CategoryDto | null;
  visible: boolean;
  hideModal: () => void;
  refetch: () => void;
};

const CategoryEditorModal = ({
  defaultValues,
  visible,
  hideModal,
  refetch,
}: Props) => {
  const { isOperating, isEditing, handleFormSubmit } = useEditorModalActions({
    service: CategoryService,
    refetch: refetch,
    hideModal,
    defaultValues,
    createSchema: CreateCategoryDto,
    updateSchema: UpdateCategoryDto,
  });

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}
    >
      <Text style={styles.formTitle}>Category Editor</Text>
      <Formik
        initialValues={defaultValues || { name: '' }}
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
            <Button
              onPress={handleSubmit}
              loading={isOperating}
              disabled={isOperating}
            >
              {isEditing ? 'Edit' : 'Create'} Category
            </Button>
          </View>
        )}
      </Formik>
    </Modal>
  );
};

export default CategoryEditorModal;

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
