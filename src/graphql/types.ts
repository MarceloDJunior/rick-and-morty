import { Character } from '@/models/character';

export type GetCharactersResponse = {
  characters: {
    info: {
      next: string | null;
    };
    results: Character[];
  };
};

export type GetCharacterResponse = {
  character: Character;
};
