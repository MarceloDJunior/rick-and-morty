import { Character } from '@/models/character';

import styles from './character-details.module.scss';

type CharacterDetailsProps = {
  character: Character;
};

export const CharacterDetails = ({ character }: CharacterDetailsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <img src={character.image} alt={character.name} className={styles.image} />
        <div className={styles.description}>
          <h1 className={styles.name}>{character.name}</h1>
          <div className={styles.info}>
            <div className={styles.label}>Status</div>
            <div className={styles.value}>{character.status}</div>
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
            <div className={styles.label}>Origin</div>
            <div className={styles.value}>{character.origin.name}</div>
          </div>
          <div className={styles.info}>
            <div className={styles.label}>Last known location</div>
            <div className={styles.value}>{character.location.name}</div>
          </div>
        </div>
      </div>
      <div className={styles.episodes}>
        <h2 className={styles.subtitle}>Episodes</h2>
        <ul>
          {character.episodes.map(episode => (
            <li key={episode.id}>
              <div>
                {episode.episode} - {episode.name}
              </div>
              <div className={styles.date}>{episode.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
