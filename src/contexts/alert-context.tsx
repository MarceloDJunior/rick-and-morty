import { createContext, useCallback, useContext, useState } from 'react';

import { Alert } from '@/components/alert';

type AlertContextType = {
  showAlert: (message?: string) => void;
};

type AlertProviderProps = {
  children: React.ReactNode;
};

const initialState: AlertContextType = {
  showAlert: () => {},
};

const AlertContext = createContext(initialState);

export const useAlertContext = () => useContext(AlertContext);

const DEFAULT_MESSAGE = 'An error occurred. Please try again later.';

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState(DEFAULT_MESSAGE);

  const showAlert = useCallback((message = DEFAULT_MESSAGE) => {
    setAlertVisible(true);
    setAlertMessage(message);
  }, []);

  const onAlertUnmount = useCallback(() => {
    setAlertVisible(false);
    setAlertMessage('');
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      <>
        {children}
        {isAlertVisible && <Alert onUnmount={onAlertUnmount} message={alertMessage} />}
      </>
    </AlertContext.Provider>
  );
};
