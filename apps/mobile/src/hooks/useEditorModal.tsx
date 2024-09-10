import { useState } from 'react';

const useEditorModal = <T,>() => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const hideModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const openModal = (item?: T) => {
    setSelectedItem(item || null);
    setModalVisible(true);
  };

  return { modalVisible, selectedItem, hideModal, openModal };
};

export default useEditorModal;
