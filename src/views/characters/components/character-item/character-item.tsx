import classNames from 'classnames';

import { Character } from '@/models/character';

import styles from './character-item.module.scss';

type CharacterItemProps = {
  className?: string;
  character: Character;
};

export const CharacterItem = ({ character, className }: CharacterItemProps) => {
  return (
    <div className={classNames(styles.character, className)}>
      <img src={character.image} alt={character.name} className={styles.image} />
      <div className={styles.description}>
        <h3 className={styles.name}>{character.name}</h3>
        <div className={styles.status}>
          <div
            className={classNames(
              styles.status__icon,
              styles[`status__icon--${character.status.toLocaleLowerCase()}`]
            )}
          />
          <span>{character.status}</span>
        </div>
        <div className={styles.info}>
          <div className={styles.label}>Species</div>
          <div className={styles.value}>{character.species}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.label}>Gender</div>
          <div className={styles.value}>{character.gender}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.label}>Last known location</div>
          <div className={styles.value}>{character.location.name}</div>
        </div>
      </div>
    </div>
  );
};
