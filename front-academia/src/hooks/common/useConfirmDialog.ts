import { useState, useCallback } from 'react';

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<{
    title?: string;
    message: string;
    onConfirm: () => void | Promise<void>;
    confirmText?: string;
    cancelText?: string;
    destructive?: boolean;
  } | null>(null);

  const openConfirmDialog = useCallback((
    message: string,
    onConfirm: () => void | Promise<void>,
    options: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
      destructive?: boolean;
    } = {}
  ) => {
    setConfig({
      message,
      onConfirm,
      ...options,
    });
    setIsOpen(true);
  }, []);

  const closeConfirmDialog = useCallback(() => {
    setIsOpen(false);
    setConfig(null);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (config?.onConfirm) {
      await config.onConfirm();
    }
    closeConfirmDialog();
  }, [config, closeConfirmDialog]);

  return {
    isOpen,
    config,
    openConfirmDialog,
    closeConfirmDialog,
    handleConfirm,
  };
};
