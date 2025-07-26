import { useState, useCallback } from 'react';

interface UseModalState {
  isOpen: boolean;
  data?: any;
}

export const useModal = <T = any>() => {
  const [modalState, setModalState] = useState<UseModalState>({
    isOpen: false,
    data: undefined,
  });

  const openModal = useCallback((data?: T) => {
    setModalState({
      isOpen: true,
      data,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      data: undefined,
    });
  }, []);

  const toggleModal = useCallback(() => {
    setModalState(prev => ({
      isOpen: !prev.isOpen,
      data: prev.isOpen ? undefined : prev.data,
    }));
  }, []);

  return {
    isOpen: modalState.isOpen,
    data: modalState.data as T | undefined,
    openModal,
    closeModal,
    toggleModal,
  };
};
