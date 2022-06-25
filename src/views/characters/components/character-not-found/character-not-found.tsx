import NotFoundImage from '@/assets/not-found.png';

import styles from './character-not-found.module.scss';

export const CharacterNotFound = () => {
  return (
    <div className={styles.container}>
      <img src={NotFoundImage.src} width={100} alt="" />
      <h2>Not found</h2>
      <p>No character found matching your search.</p>
      <p>Try to search for another character.</p>
    </div>
  );
};
