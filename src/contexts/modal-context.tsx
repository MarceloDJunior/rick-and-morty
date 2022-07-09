import { createContext, useCallback, useContext, useState } from 'react';

import { Modal } from '@/components/modal';

type ModalParams = {
  title: string;
  content: React.ReactNode;
  onClose?: () => void;
};

type ModalContextType = {
  showModal: (params: ModalParams) => void;
  hideModal: () => void;
};

type ModalProviderProps = {
  children: React.ReactNode;
};

const initialState: ModalContextType = {
  showModal: () => {},
  hideModal: () => {},
};

const ModalContext = createContext(initialState);

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalParams, setModalParams] = useState<ModalParams>();

  const showModal = useCallback((params: ModalParams) => {
    setIsModalVisible(true);
    setModalParams(params);
  }, []);

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
    modalParams?.onClose?.();
    setModalParams(undefined);
  }, [modalParams]);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      <>
        {children}
        {isModalVisible && (
          <Modal title={modalParams?.title || ''} onClose={hideModal}>
            {modalParams?.content}
          </Modal>
        )}
      </>
    </ModalContext.Provider>
  );
};
