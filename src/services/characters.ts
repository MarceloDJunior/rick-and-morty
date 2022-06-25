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
  public static async getCharacters(page = 1): Promise<GetCharactersResponse> {
    try {
      const response = await api.get(`/character/?page=${page}`);
      switch (response.status) {
        case 200:
          return response.data as GetCharactersResponse;
        case 404:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    } catch (error) {
      throw new UnexpectedError();
    }
  }

  public static async getCharactersByName(name: string, page = 1): Promise<GetCharactersResponse> {
    try {
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
    } catch (error) {
      throw new UnexpectedError();
    }
  }
}
