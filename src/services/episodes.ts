import { Episode } from '@/models/episode';
import { api } from '@/services/api';
import { UnexpectedError } from '@/services/errors';

export class EpisodesService {
  private constructor() {}

  public static async getEpisodesByNumber(numbers: number[]): Promise<Episode[]> {
    const response = await api.get(`/episode/${numbers.join(',')}`);
    switch (response.status) {
      case 200:
        if (response.data instanceof Array) {
          return response.data as Episode[];
        }
        return [response.data as Episode];
      default:
        throw new UnexpectedError();
    }
  }
}
