import { useEffect, useState } from 'react';

import Logo from '@/assets/logo.svg';
import { CharactersService } from '@/services/characters';
import { Character } from '@/models/character';

import { CharacterItem } from './components/character-item';
import styles from './home.module.scss';

export const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const getCharacters = async () => {
      const { results } = await CharactersService.getCharacters();
      setCharacters(results);
    };

    getCharacters();
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.characters}>
        {characters.map(character => (
          <CharacterItem key={character.id} character={character} className={styles.character} />
        ))}
      </div>
    </main>
  );
};
