import styles from './circle-loader.module.scss';

type CircleLoaderProps = {
  color?: string;
  size?: number;
};

export const CircleLoader = ({ color, size = 40 }: CircleLoaderProps) => {
  const sizeInPx = `${size}px`;
  const borderSizeInPx = `${size * 0.1}px`;

  return (
    <div className={styles['loader-container']} style={{ width: sizeInPx, height: sizeInPx }}>
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          style={{
            borderColor: `${color} transparent transparent transparent`,
            borderWidth: borderSizeInPx,
          }}
        ></div>
      ))}
    </div>
  );
};
