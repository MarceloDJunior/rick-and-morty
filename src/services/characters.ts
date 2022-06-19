import { Character } from '@/models/character';
import { api } from '@/services/api';

type GetCharactersResponse = {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: Character[];
};

export class CharactersService {
  public static async getCharacters(): Promise<GetCharactersResponse> {
    const response = await api.get('/character/');
    return response.data as GetCharactersResponse;
  }
}
