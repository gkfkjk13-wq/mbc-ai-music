
import { GoogleGenAI, Type } from "@google/genai";
import { Song, RecommendationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SONG_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    songs: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          artist: { type: Type.STRING },
          description: { type: Type.STRING, description: "Why this song fits the commute theme in Korean" },
          isKorean: { type: Type.BOOLEAN, description: "True if it's a Korean song, False if international" },
          mood: { type: Type.STRING, description: "One word mood (e.g., Chill, Energetic, Sad)" }
        },
        required: ["id", "title", "artist", "description", "isKorean", "mood"]
      }
    },
    dailyMessage: { type: Type.STRING, description: "A short, encouraging message for the user's commute in Korean" }
  },
  required: ["songs", "dailyMessage"]
};

export const getCommutePlaylist = async (theme: string): Promise<RecommendationResponse> => {
  const prompt = `
    Generate a music playlist for a user's commute (subway or bus) based on the following theme or genre: "${theme}".
    
    Requirements:
    1. Total songs: Exactly 7.
    2. Ratio: 5 Korean songs (70%) and 2 International/Western songs (30%).
    3. The tone of the 'description' should be helpful and friendly, explaining why the song is good for commuting.
    4. Language: descriptions and messages must be in Korean.
    5. Ensure the songs are actual real songs.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: SONG_SCHEMA,
      },
    });

    const result = JSON.parse(response.text || '{}');
    return result as RecommendationResponse;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw new Error("추천 음악을 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
  }
};
