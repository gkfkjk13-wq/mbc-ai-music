
import React, { useState, useEffect } from 'react';
import { getCommutePlaylist } from './services/geminiService';
import { Song, RecommendationResponse } from './types';
import SongCard from './components/SongCard';
import Header from './components/Header';

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>('오늘의 추천');
  const [userInput, setUserInput] = useState<string>('');
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [message, setMessage] = useState<string>('어떤 분위기의 음악을 듣고 싶으신가요?');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async (customTheme?: string) => {
    setLoading(true);
    setError(null);
    try {
      const targetTheme = customTheme || theme;
      const data = await getCommutePlaylist(targetTheme);
      setPlaylist(data.songs);
      setMessage(data.dailyMessage);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setTheme(userInput);
    fetchRecommendations(userInput);
  };

  const handleReRecommend = () => {
    fetchRecommendations(theme);
  };

  // Initial load
  useEffect(() => {
    fetchRecommendations('상쾌한 아침 출근길');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 py-8 pb-24">
        <section className="mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="음악 테마나 장르를 입력하세요 (예: 비 오는 날, 팝송, 재즈...)"
              className="w-full pl-4 pr-12 py-4 text-lg border-2 border-gray-100 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all shadow-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 top-3 bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
            >
              <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-search'} text-lg`}></i>
            </button>
          </form>
        </section>

        <section className="mb-10 text-center">
          {loading ? (
             <div className="flex flex-col items-center justify-center space-y-4 py-12">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium">취향에 딱 맞는 7곡을 고르는 중...</p>
             </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
              {error}
              <button onClick={handleReRecommend} className="ml-4 underline font-bold">다시 시도</button>
            </div>
          ) : (
            <>
              <div className="mb-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                <p className="text-indigo-800 font-medium italic">"{message}"</p>
                <p className="text-xs text-indigo-400 mt-2 uppercase tracking-widest font-bold">Theme: {theme}</p>
              </div>
              
              <div className="space-y-4">
                {playlist.map((song, index) => (
                  <SongCard key={song.id || index} song={song} index={index} />
                ))}
              </div>

              <div className="mt-12">
                <button
                  onClick={handleReRecommend}
                  className="bg-white border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-md active:scale-95"
                >
                  <i className="fas fa-redo-alt mr-2"></i> 다른 추천 받기
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 text-center text-xs text-gray-400 z-50">
        <p>© 2024 Commute Beats. 한국 음악 5곡 & 해외 음악 2곡 구성</p>
      </footer>
    </div>
  );
};

export default App;
