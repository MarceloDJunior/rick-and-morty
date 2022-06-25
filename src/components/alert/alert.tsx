import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import ErrorIcon from '@/assets/error-icon.svg';

import styles from './alert.module.scss';

type AlertProps = {
  message: string;
  onUnmount?: () => void;
};

export const Alert = ({ message, onUnmount }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const unmount = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      if (onUnmount) {
        onUnmount();
      }
    }, 600);
  }, [onUnmount]);

  useEffect(() => {
    const timeout = setTimeout(unmount, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [unmount]);

  return (
    <div className={classNames(styles.container, { [styles.hidden]: !isVisible })}>
      <div className={styles.icon}>
        <ErrorIcon />
      </div>
      <div className={styles.content}>
        <h3>Error</h3>
        <p>{message}</p>
      </div>
      <button className={styles.close} onClick={unmount}>
        &times;
      </button>
    </div>
  );
};
