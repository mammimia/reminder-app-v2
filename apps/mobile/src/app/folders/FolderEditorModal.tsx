import {
  CategoryDto,
  CreateFolderDto,
  FolderDto,
  UpdateFolderDto,
} from '@mammimia/types';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Text, TextInput } from 'react-native-paper';
import Picker from '../../components/Picker';
import useEditorModalActions from '../../hooks/useEditorModalActions';
import useFetchData from '../../hooks/useFetchData';
import CategoryService from '../services/CategoryService';
import FolderService from '../services/FolderService';

type Props = {
  defaultValues?: FolderDto | null;
  visible: boolean;
  hideModal: () => void;
  refetch: () => void;
};

const FolderEditorModal = ({
  defaultValues,
  visible,
  hideModal,
  refetch,
}: Props) => {
  const { isOperating, isEditing, handleFormSubmit } = useEditorModalActions({
    service: FolderService,
    refetch: refetch,
    hideModal,
    defaultValues,
    createSchema: CreateFolderDto,
    updateSchema: UpdateFolderDto,
  });

  const { data } = useFetchData<CategoryDto>({
    fetchMethod: CategoryService.get,
  });

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}
    >
      <Text style={styles.formTitle}>Folder Editor</Text>
      <Formik
        initialValues={
          defaultValues || {
            name: '',
            color: '',
            categoryId: null,
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
            <TextInput
              label="Color"
              onChangeText={handleChange('color')}
              onBlur={handleBlur('color')}
              value={values.color}
            />
            <Picker
              label="Category"
              value={values.categoryId}
              items={data?.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
              handleChange={handleChange('categoryId')}
            />
            <Button
              onPress={handleSubmit}
              loading={isOperating}
              disabled={isOperating}
            >
              {isEditing ? 'Edit' : 'Create'} Folder
            </Button>
          </View>
        )}
      </Formik>
    </Modal>
  );
};

export default FolderEditorModal;

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
