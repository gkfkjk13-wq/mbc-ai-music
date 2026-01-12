
import React from 'react';
import { Song } from '../types';

interface SongCardProps {
  song: Song;
  index: number;
}

const SongCard: React.FC<SongCardProps> = ({ song, index }) => {
  const searchQuery = encodeURIComponent(`${song.artist} ${song.title}`);
  const youtubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

  const badgeColor = song.isKorean 
    ? 'bg-blue-100 text-blue-700' 
    : 'bg-emerald-100 text-emerald-700';

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-5 flex items-center space-x-4 transition-all hover:shadow-lg hover:border-indigo-200 animate-in fade-in duration-500">
      <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-lg shadow-inner">
        {index + 1}
      </div>
      
      <div className="flex-grow text-left">
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {song.title}
          </h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${badgeColor}`}>
            {song.isKorean ? 'K-Pop' : 'Global'}
          </span>
        </div>
        <p className="text-gray-500 font-medium text-sm mb-2">{song.artist}</p>
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 italic">
          <i className="fas fa-quote-left text-[8px] mr-1 opacity-50"></i>
          {song.description}
        </p>
      </div>

      <div className="flex-shrink-0">
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-90"
          title="유튜브에서 듣기"
        >
          <i className="fab fa-youtube text-xl"></i>
        </a>
      </div>
    </div>
  );
};

export default SongCard;
