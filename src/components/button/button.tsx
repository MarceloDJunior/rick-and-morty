import classNames from 'classnames';

import { Loader } from '@/components/loader';

import styles from './button.module.scss';

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Button = ({ children, className, loading, ...props }: ButtonProps) => {
  return (
    <button type="button" className={classNames(className, styles.button)} {...props}>
      {loading ? <Loader /> : children}
    </button>
  );
};
