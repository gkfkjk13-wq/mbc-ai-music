
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-4 shadow-sm">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <i className="fas fa-bus-alt text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Commute Beats</h1>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Your Daily Rhythm</p>
          </div>
        </div>
        <div className="flex space-x-3 text-gray-400 text-sm">
          <i className="fas fa-subway"></i>
          <i className="fas fa-walking"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
