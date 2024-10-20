import { useState } from 'react';
import { ZodSchema } from 'zod';
import { TCrudService } from '../app/services/TCrudService';

type Props<T, CreateDto, UpdateDto = void, FilterDto = void> = {
  service: TCrudService<T, CreateDto, UpdateDto, FilterDto>;
  refetch: () => void;
  hideModal: () => void;
  defaultValues?: (T & { id: string }) | null;
  createSchema: ZodSchema<CreateDto>;
  updateSchema: ZodSchema<UpdateDto>;
};

type ReturnType<CreateDto, UpdateDto> = {
  isOperating: boolean;
  isEditing: boolean;
  handleFormSubmit: (values: CreateDto | UpdateDto) => void;
};

const useEditorModalActions = <T, CreateDto, UpdateDto, FilterDto>({
  service,
  refetch,
  hideModal,
  defaultValues,
  createSchema,
  updateSchema,
}: Props<T, CreateDto, UpdateDto, FilterDto>): ReturnType<
  CreateDto,
  UpdateDto
> => {
  const [isOperating, setIsOperating] = useState(false);
  const isEditing = !!defaultValues;

  const handleCreate = (values: CreateDto) => {
    setIsOperating(true);
    try {
      const parsedValues = createSchema.parse(values);
      service.create(parsedValues).then(() => {
        hideModal();
        refetch();
        setIsOperating(false);
      });
    } catch (error) {
      console.error(error);
      setIsOperating(false);
    }
  };

  const handleEdit = (values: UpdateDto) => {
    if (!defaultValues) return;

    if (service.update === undefined) return;

    setIsOperating(true);

    try {
      const parsedValues = updateSchema.parse(values);
      service.update(defaultValues?.id, parsedValues).then(() => {
        hideModal();
        refetch();
        setIsOperating(false);
      });
    } catch (error) {
      console.error(error);
      setIsOperating(false);
    }
  };

  const handleFormSubmit = (values: CreateDto | UpdateDto) => {
    if (isEditing) {
      handleEdit(values as UpdateDto);
    } else {
      handleCreate(values as CreateDto);
    }
  };

  return { isOperating, isEditing, handleFormSubmit };
};

export default useEditorModalActions;
