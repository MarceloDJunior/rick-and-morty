import { Character } from '@/models/character';
import { api } from '@/services/api';
import { NotFoundError, UnexpectedError } from '@/services/errors';

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
  private constructor() {}

  public static async getCharacters(page = 1): Promise<GetCharactersResponse> {
    const response = await api.get(`/character/?page=${page}`);
    switch (response.status) {
      case 200:
        return response.data as GetCharactersResponse;
      default:
        throw new UnexpectedError();
    }
  }

  public static async getCharactersByName(name: string, page = 1): Promise<GetCharactersResponse> {
    let endpoint = `/character/?page=${page}`;
    if (name) {
      endpoint += `&name=${name}`;
    }
    const response = await api.get(endpoint);
    switch (response.status) {
      case 200:
        return response.data as GetCharactersResponse;
      case 404:
        throw new NotFoundError();
      default:
        throw new UnexpectedError();
    }
  }

  public static async getCharacterById(id: number): Promise<Character> {
    const response = await api.get(`/character/${id}`);
    switch (response.status) {
      case 200:
        return response.data as Character;
      case 404:
        throw new NotFoundError();
      default:
        throw new UnexpectedError();
    }
  }
}
