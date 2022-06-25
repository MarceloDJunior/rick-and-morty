import styles from './dots-loader.module.scss';

type DotsLoaderProps = {
  color?: string;
};

export const DotsLoader = ({ color }: DotsLoaderProps) => {
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
