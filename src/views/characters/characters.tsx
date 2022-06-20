import { useCallback, useEffect, useState } from 'react';

import Logo from '@/assets/logo.svg';
import { CharactersService } from '@/services/characters';
import { Character } from '@/models/character';
import { Button } from '@/components/button';

import { CharacterItem } from './components/character-item';
import styles from './characters.module.scss';

const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
};

export const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadCharacters = useCallback(
    async (page?: number) => {
      try {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        const { results } = await CharactersService.getCharacters(page);
        setCharacters(prevCharacters => [...prevCharacters, ...results]);
        setPage(prevPage => prevPage + 1);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const loadMoreCharacters = useCallback(async () => {
    await loadCharacters(page);
    setTimeout(scrollToBottom, 300);
  }, [loadCharacters, page]);

  useEffect(() => {
    loadCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__content}>
          <div className={styles.logo}>
            <Logo />
          </div>
        </div>
      </header>
      <main className={styles.container}>
        <div className={styles.characters}>
          {characters.map(character => (
            <CharacterItem key={character.id} character={character} className={styles.character} />
          ))}
        </div>
        <Button onClick={loadMoreCharacters} disabled={isLoading} loading={isLoading}>
          Load more
        </Button>
      </main>
    </>
  );
};
