import React from 'react';
import { SoundOutlined } from '@ant-design/icons';

const WordCard = ({ word, status, isShowingMeaning, onToggleMeaning, onPlayAudio, onMarkStatus }) => {
  return (
    <div 
      className={`bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 
        border border-gray-100 flex flex-col gap-4 relative group
        ${status === 'learned' ? 'ring-1 ring-primary-300' : ''}
        ${status === 'mastered' ? 'ring-2 ring-primary-500' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">
            {word.word || word.phrase}
          </h3>
          {word.phonetic && (
            <div className="inline-flex items-center gap-2 text-sm text-gray-500">
              <span className="font-mono">{word.phonetic}</span>
            </div>
          )}
        </div>
        <AudioButton onPlay={() => onPlayAudio(word.word || word.phrase)} />
      </div>

      <ToggleButton isShowing={isShowingMeaning} onClick={onToggleMeaning} />
      
      <WordContent 
        word={word} 
        isShowing={isShowingMeaning} 
        status={status}
        onMarkStatus={onMarkStatus}
      />
    </div>
  );
};

const AudioButton = ({ onPlay }) => (
  <button 
    onClick={(e) => {
      e.stopPropagation();
      onPlay();
    }}
    className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-50 
      text-primary-500 transition-all hover:bg-primary-100 hover:scale-105 
      active:scale-95 flex-shrink-0"
    title="播放发音"
    aria-label="播放发音"
  >
    <SoundOutlined className="text-lg" />
  </button>
);

const ToggleButton = ({ isShowing, onClick }) => (
  <button 
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`w-full px-3 py-2 text-sm rounded-lg transition-all
      ${isShowing 
        ? 'bg-primary-50 text-primary-600 hover:bg-primary-100' 
        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
  >
    {isShowing ? '隐藏释义' : '显示释义'}
  </button>
);

const WordContent = ({ word, isShowing, status, onMarkStatus }) => (
  <div className={`space-y-4 transition-all duration-300 ${
    isShowing ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
  }`}>
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <p className="text-gray-900 text-[15px] leading-relaxed">
        {word.meaning}
      </p>
      {word.example && (
        <p className="text-gray-600 text-sm italic">
          {word.example}
        </p>
      )}
      {word.synonyms && (
        <p className="text-gray-600 text-sm">
          同义词: {word.synonyms.join(', ')}
        </p>
      )}
      {word.usage && (
        <p className="text-gray-600 text-sm">
          用法: {word.usage}
        </p>
      )}
    </div>

    <div className="flex gap-3">
      <StatusButton 
        isActive={status === 'learned'}
        onClick={() => onMarkStatus('learned')}
        label="已学习"
      />
      <StatusButton 
        isActive={status === 'mastered'}
        onClick={() => onMarkStatus('mastered')}
        label="已掌握"
      />
    </div>
  </div>
);

const StatusButton = ({ isActive, onClick, label }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all
      ${isActive
        ? 'bg-primary-500 text-white hover:bg-primary-600'
        : 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50'}`}
  >
    {label}
  </button>
);

export default WordCard; 