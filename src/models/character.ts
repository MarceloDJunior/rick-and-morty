import { Episode } from '@/models/episode';
import { Location } from '@/models/location';

export type Character = {
  id: number;
  name: string;
  image: string;
  episodes: Episode[];
  gender: string;
  location: Location;
  origin: Location;
  species: string;
  status: string;
};
