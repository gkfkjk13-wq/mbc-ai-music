
export interface Song {
  id: string;
  title: string;
  artist: string;
  description: string;
  isKorean: boolean;
  mood: string;
}

export interface RecommendationResponse {
  songs: Song[];
  dailyMessage: string;
}
