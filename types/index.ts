// SurviveBase - Type Definitions

export interface Game {
  appid: number;
  name: string;
  description: string;
  headerImage: string;
  screenshots: string[];
  price: {
    initial: number;
    final: number;
    discountPercent: number;
    isFree: boolean;
  };
  reviews: {
    positive: number;
    negative: number;
    score: number;
  };
  releaseDate: string;
  tags: string[];
  categories: {
    singleplayer: boolean;
    multiplayer: boolean;
    coop: boolean;
  };
  owners: string;
  playtime: number;
  updatedAt: string;
}

export type SortOption =
  | 'popular'
  | 'rating'
  | 'newest'
  | 'trending'
  | 'rising';

export interface FilterState {
  search: string;
  sort: SortOption;
  tags: string[];
  priceRange: PriceRange | null;
  playMode: PlayMode[];
}

export type PriceRange = 'free' | 'under15000' | 'under30000' | 'over30000';

export type PlayMode = 'singleplayer' | 'multiplayer' | 'coop';

export interface Tag {
  name: string;
  count: number;
}
