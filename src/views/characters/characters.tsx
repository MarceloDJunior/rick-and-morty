import { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import ArrowDownSvg from '@/assets/arrow-down.svg';
import { Character } from '@/models/character';
import { Button } from '@/components/button';
import { CircleLoader } from '@/components/loaders/circle-loader';
import { AnimatedScale } from '@/components/animated-scale';
import { CharactersService, GetCharactersResponse } from '@/services/characters';

import { CharacterItem } from './components/character-item';
import { Header } from './components/header';
import styles from './characters.module.scss';

type AnimatedCharacter = Character & {
  delay: number;
};

const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
};

export const Characters = () => {
  const [characters, setCharacters] = useState<AnimatedCharacter[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);

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
        setIsAtBottom(false);
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

  const onButtonClick = useCallback(() => {
    if (isLoading) {
      return;
    }
    if (isAtBottom) {
      loadMoreCharacters();
    } else {
      scrollToBottom();
    }
  }, [isAtBottom, isLoading, loadMoreCharacters]);

  useEffect(() => {
    if (searchValue) {
      searchCharacters(searchValue);
    } else {
      loadCharacters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const bottomThreshold = document.body.scrollHeight - 50;

      setIsAtBottom(scrollPosition >= bottomThreshold);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isLoading]);

  const buttonContent = useMemo(() => {
    if (isLoading) {
      return <CircleLoader size={38} />;
    }
    if (isAtBottom) {
      return 'Load more';
    }
    return <ArrowDownSvg />;
  }, [isAtBottom, isLoading]);

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
        {hasMore && (
          <Button
            className={classNames(styles.button, {
              [styles['load-more']]: isAtBottom && !isLoading,
              [styles.loading]: isLoading,
              [styles.scroll]: !isAtBottom,
            })}
            onClick={onButtonClick}
          >
            {buttonContent}
          </Button>
        )}
      </main>
    </>
  );
};
