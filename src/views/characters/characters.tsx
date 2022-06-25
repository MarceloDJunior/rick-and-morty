import { useCallback, useEffect, useState } from 'react';

import { Character } from '@/models/character';
import { Header } from '@/components/header';
import { LoadMoreAndScrollButton } from '@/components/button';
import { AnimatedScale } from '@/components/animated-scale';
import { CharactersService, GetCharactersResponse } from '@/services/characters';

import { CharacterItem } from './components/character-item';
import styles from './characters.module.scss';

type AnimatedCharacter = Character & {
  delay: number;
};

export const Characters = () => {
  const [characters, setCharacters] = useState<AnimatedCharacter[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [hasMore, setHasMore] = useState(false);

  const handleGetCharactersSuccess = useCallback(
    (response: GetCharactersResponse) => {
      setTimeout(() => {
        const { info, results } = response;
        const charactersWithDelay = results.map((character, index) => ({
          ...character,
          delay: index * 100,
        }));
        setHasMore(!!info.next);
        if (page === 1) {
          setCharacters(charactersWithDelay);
        } else {
          setCharacters(prevCharacters => [...prevCharacters, ...charactersWithDelay]);
        }
        setPage(page + 1);
        setIsLoading(false);
      }, 400);
    },
    [page]
  );

  const loadCharacters = useCallback(
    async (page = 1) => {
      try {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        const response = await CharactersService.getCharacters(page);
        handleGetCharactersSuccess(response);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [handleGetCharactersSuccess, isLoading]
  );

  const searchCharacters = useCallback(
    async (value: string, page = 1) => {
      try {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        const response = await CharactersService.getCharactersByName(value, page);
        handleGetCharactersSuccess(response);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [handleGetCharactersSuccess, isLoading]
  );

  const loadMoreCharacters = useCallback(async () => {
    if (searchValue) {
      await searchCharacters(searchValue, page);
    } else {
      await loadCharacters(page);
    }
  }, [loadCharacters, page, searchCharacters, searchValue]);

  const handleSearch = useCallback(
    async (value: string) => {
      setPage(1);
      setSearchValue(value);
    },
    [setSearchValue]
  );

  useEffect(() => {
    if (searchValue) {
      searchCharacters(searchValue);
    } else {
      loadCharacters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <>
      <Header onSearch={handleSearch} />
      <main className={styles.container}>
        <div className={styles.characters}>
          {characters.map(character => (
            <AnimatedScale
              key={character.id}
              delay={character.delay}
              duration={600}
              className={styles['character-container']}
            >
              <CharacterItem character={character} className={styles.character} />
            </AnimatedScale>
          ))}
        </div>
        {hasMore && <LoadMoreAndScrollButton onClick={loadMoreCharacters} isLoading={isLoading} />}
      </main>
    </>
  );
};
