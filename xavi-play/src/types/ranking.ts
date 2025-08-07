export interface RankingUser {
  id: number;
  name: string;
  level: number;
  experience: number;
  section: string;
  xavicoints: number;
  pokemon?: {
    id: number;
    name: string;
    imageUrl: string;
    highResImageUrl: string;
  };
}

export interface RankingResponse {
  users: RankingUser[];
  total: number;
}

export interface RankingFilters {
  section?: string;
} 