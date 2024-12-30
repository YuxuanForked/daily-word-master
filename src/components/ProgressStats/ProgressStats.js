import React from 'react';

const ProgressStats = ({ stats }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">今日学习</h1>
    <div className="flex justify-around items-center flex-wrap gap-4 mb-6">
      <StatItem 
        label="今日目标" 
        value={stats.total} 
        unit="个单词"
        color="text-blue-600" 
      />
      <StatItem 
        label="已学习" 
        value={stats.learned} 
        unit="个"
        color="text-green-600"
      />
      <StatItem 
        label="已掌握" 
        value={stats.mastered} 
        unit="个"
        color="text-primary-600"
      />
    </div>
    <ProgressBar 
      progress={(stats.mastered / stats.total) * 100}
      learned={(stats.learned / stats.total) * 100}
    />
  </div>
);

const StatItem = ({ label, value, unit, color }) => (
  <div className="text-center px-4">
    <span className="block text-gray-500 text-sm mb-1">{label}</span>
    <span className={`text-2xl font-bold ${color}`}>
      {value}<span className="text-base ml-1">{unit}</span>
    </span>
  </div>
);

const ProgressBar = ({ progress, learned }) => (
  <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
    <div 
      className="absolute left-0 top-0 h-full bg-green-200 transition-all duration-300"
      style={{ width: `${learned}%` }}
    />
    <div 
      className="absolute left-0 top-0 h-full bg-primary-500 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default ProgressStats; 