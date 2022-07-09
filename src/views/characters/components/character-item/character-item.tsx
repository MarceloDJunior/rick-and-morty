import { memo } from 'react';
import classNames from 'classnames';

import { Character } from '@/models/character';

import styles from './character-item.module.scss';

type CharacterItemProps = {
  className?: string;
  character: Character;
  onClick?: (character: Character) => void;
};

const CharacterItemComponent = ({ character, className, onClick }: CharacterItemProps) => {
  const handleClick = () => {
    onClick?.(character);
  };

  return (
    <div
      className={classNames(styles.character, className)}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
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
          <span>
            {character.status} - {character.species}
          </span>
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

export const CharacterItem = memo(CharacterItemComponent);
