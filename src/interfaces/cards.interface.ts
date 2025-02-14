import { Gender } from "../enums/gender.enum";
import { IEpisode } from "./episodes.interfaces";
import { ILocation } from "./locations.interfaces";
import { IPagination } from "./pagination.interface";

export interface ICardSummary {
  id: string;
  name: string;
  created_at: string;
  image_url: string;
  type: string;
  gender: Gender;
  is_active: boolean;
  is_created_by_admin: boolean;
  location_id: number | null;
  is_owned?: boolean;
}

export interface IGetCardsResponse {
  data: ICardSummary[];
  info: IPagination;
}

export interface ICard extends ICardSummary {
  is_owned: boolean;
  location: ILocation;
  episodes: IEpisode[];
}

export interface ICreateCard {
  name: string;
  type?: string;
  gender: Gender;
  isActive: boolean;
  locationId: number;
  episodesId: number[];
  image: Blob;
}

export interface ICardFrom {
  name: string;
  type?: string;
  gender: Gender;
  isActive: boolean;
  location: ILocation;
  episodes: IEpisode[];
  image: {
    url: string;
    image?: Blob;
  } | null;
}
