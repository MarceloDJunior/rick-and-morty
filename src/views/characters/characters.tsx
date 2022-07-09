import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Header } from '@/components/header';
import { LoadMoreAndScrollButton } from '@/components/button';
import { AnimatedScale } from '@/components/animated-scale';
import { useAlertContext } from '@/contexts/alert-context';
import { useModalContext } from '@/contexts/modal-context';
import { ScrollHelper } from '@/helpers/scroll-helper';
import { Character } from '@/models/character';
import { CharactersService, GetCharactersResponse } from '@/services/characters';
import { NotFoundError } from '@/services/errors';
import { CharacterDetails } from '@/views/character-details';

import { CharacterNotFound } from './components/character-not-found';
import { CharacterItemSkeleton } from './components/character-item-skeleton';
import { CharacterItem } from './components/character-item';
import styles from './characters.module.scss';

type AnimatedCharacter = Character & {
  delay: number;
};

export const Characters = () => {
  const router = useRouter();
  const { showAlert } = useAlertContext();
  const { showModal } = useModalContext();
  const [characters, setCharacters] = useState<AnimatedCharacter[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [hasMore, setHasMore] = useState(false);

  const handleGetCharactersSuccess = useCallback(
    (response: GetCharactersResponse) => {
      // Time to show the button animation
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

  const handleGetCharactersError = useCallback(
    (error: any) => {
      if (error instanceof NotFoundError) {
        setIsLoading(false);
        setHasMore(false);
        setCharacters([]);
        return;
      }
      showAlert();
    },
    [showAlert]
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
        handleGetCharactersError(error);
      }
    },
    [handleGetCharactersError, handleGetCharactersSuccess, isLoading]
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
        handleGetCharactersError(error);
      }
    },
    [handleGetCharactersError, handleGetCharactersSuccess, isLoading]
  );

  const loadMoreCharacters = useCallback(() => {
    if (searchValue) {
      searchCharacters(searchValue, page);
    } else {
      loadCharacters(page);
    }
  }, [loadCharacters, page, searchCharacters, searchValue]);

  const handleSearch = useCallback(
    async (value: string) => {
      setPage(1);
      setSearchValue(value);
      ScrollHelper.scrollToTop();
    },
    [setSearchValue]
  );

  const addCharacterIdToUrl = useCallback(
    (character: Character) => {
      router.replace(`?characterId=${character.id}`, undefined, { shallow: true });
    },
    [router]
  );

  const removeCharacterIdFromUrl = useCallback(() => {
    router.replace('/', undefined, { shallow: true });
  }, [router]);

  const showCharacterDetails = useCallback(
    (character: Character) => {
      showModal({
        title: 'Character Details',
        content: <CharacterDetails character={character} />,
        onClose: removeCharacterIdFromUrl,
      });
    },
    [removeCharacterIdFromUrl, showModal]
  );

  const getCharacterAndShowDetails = useCallback(
    async (characterId: number) => {
      try {
        const character: Character = await CharactersService.getCharacterById(characterId);
        showCharacterDetails(character);
      } catch (error) {
        showAlert();
      }
    },
    [showAlert, showCharacterDetails]
  );

  useEffect(() => {
    if (searchValue) {
      searchCharacters(searchValue);
    } else {
      loadCharacters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    if (router.isReady && router.query.characterId) {
      const characterId = Number(router.query.characterId);
      const character: Character | undefined = characters.find(c => c.id === characterId);
      if (character) {
        showCharacterDetails(character);
      } else {
        getCharacterAndShowDetails(characterId);
      }
    }
  }, [
    characters,
    router.isReady,
    router.query.characterId,
    showCharacterDetails,
    getCharacterAndShowDetails,
  ]);

  const characterNotFound = useMemo(() => {
    return !!(searchValue && characters.length === 0);
  }, [characters.length, searchValue]);

  const renderCharacters = useMemo(() => {
    if (!hasMore && isLoading) {
      return (
        <div className={styles.characters}>
          {Array.from({ length: 12 }).map((_, index) => (
            <CharacterItemSkeleton key={index} />
          ))}
        </div>
      );
    }
    if (characterNotFound) {
      return (
        <AnimatedScale delay={200} duration={400}>
          <CharacterNotFound />
        </AnimatedScale>
      );
    }
    if (characters.length > 0) {
      return (
        <div className={styles.characters}>
          {characters.map(character => (
            <AnimatedScale
              key={character.id}
              delay={character.delay}
              duration={600}
              className={styles['character-container']}
            >
              <CharacterItem
                character={character}
                className={styles.character}
                onClick={addCharacterIdToUrl}
              />
            </AnimatedScale>
          ))}
        </div>
      );
    }
    return null;
  }, [characterNotFound, characters, addCharacterIdToUrl, hasMore, isLoading]);

  return (
    <>
      <Header onSearch={handleSearch} />
      <main className={styles.container}>
        {renderCharacters}
        {hasMore && <LoadMoreAndScrollButton onClick={loadMoreCharacters} isLoading={isLoading} />}
      </main>
    </>
  );
};
