import { useState } from 'react';

const useEditorModal = <T,>() => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const hideModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const openEditModal = (item?: T) => {
    setSelectedItem(item || null);
    setModalVisible(true);
  };

  return { modalVisible, selectedItem, hideModal, openEditModal };
};

export default useEditorModal;
