import classNames from 'classnames';

import styles from './animated-scale.module.scss';

type AnimatedScaleProps = {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
};

export const AnimatedScale = ({
  className,
  children,
  delay = 0,
  duration = 300,
}: AnimatedScaleProps) => {
  return (
    <div
      className={classNames(className, styles.animated)}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};
