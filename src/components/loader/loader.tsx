import styles from './loader.module.scss';

type LoaderProps = {
  color?: string;
};

export const Loader = ({ color }: LoaderProps) => {
  return (
    <div className={styles['loader-container']} aria-label="Loading...">
      <div className={styles['loading-spinner']}>
        <div className={styles.spinner}>
          {[...Array(5)].map((_, index) => (
            <div key={index} style={{ backgroundColor: color }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};
