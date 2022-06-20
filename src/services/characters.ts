import { Character } from '@/models/character';
import { api } from '@/services/api';

export type GetCharactersResponse = {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: Character[];
};

export class CharactersService {
  public static async getCharacters(page = 1): Promise<GetCharactersResponse> {
    const response = await api.get(`/character/?page=${page}`);
    return response.data as GetCharactersResponse;
  }

  public static async getCharactersByName(name: string, page = 1): Promise<GetCharactersResponse> {
    let endpoint = `/character/?page=${page}`;
    if (name) {
      endpoint += `&name=${name}`;
    }
    const response = await api.get(endpoint);
    return response.data as GetCharactersResponse;
  }
}
