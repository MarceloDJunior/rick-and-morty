import { Location } from '@/models/location';

export type Character = {
  id: number;
  name: string;
  image: string;
  episode: string[];
  gender: string;
  location: Location;
  origin: Location;
  species: string;
  status: string;
  type: string;
  url: string;
};
