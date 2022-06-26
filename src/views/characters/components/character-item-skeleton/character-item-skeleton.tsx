import styles from './character-item-skeleton.module.scss';

export const CharacterItemSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image} />
      <div className={styles.description}>
        <h3 className={styles.name} />
        <div className={styles.status} />
        <div className={styles.info} />
        <div className={styles.info} />
      </div>
    </div>
  );
};
