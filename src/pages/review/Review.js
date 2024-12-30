import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useWords } from '../../context/WordContext';
import { SoundOutlined, CheckOutlined, CloseOutlined, RedoOutlined } from '@ant-design/icons';
import './Review.css';

const Review = () => {
  const [reviewWords, setReviewWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const { user } = useUser();
  const { wordCategories, dailyWords } = useWords();

  useEffect(() => {
    if (!dailyWords) return;

    const today = new Date().toISOString().split('T')[0];
    const progress = JSON.parse(localStorage.getItem(`wordProgress_${user.username}_${today}`)) || {};
    
    const wordsToReview = Object.entries(progress)
      .filter(([_, status]) => status === 'learned')
      .map(([key]) => {
        const [listType, index] = key.split('-');
        return listType === 'daily' ? dailyWords.words[index] : wordCategories[listType].words[index];
      })
      .filter(Boolean); // 过���掉可能的 undefined 值

    setReviewWords(wordsToReview);
  }, [user.username, dailyWords, wordCategories]);

  const playAudio = async (word) => {
    try {
      const audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=1`);
      await audio.play();
    } catch (error) {
      console.error('音频播放失败:', error);
    }
  };

  const handleAnswer = (correct) => {
    setStats(prev => ({
      ...prev,
      [correct ? 'correct' : 'wrong']: prev[correct ? 'correct' : 'wrong'] + 1
    }));
    
    if (currentIndex < reviewWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const resetReview = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setStats({ correct: 0, wrong: 0 });
  };

  if (reviewWords.length === 0) {
    return (
      <div className="review-empty">
        <h2>暂无需要复习的单词</h2>
        <p>请先在学习页面标记一些单词为"已学习"</p>
      </div>
    );
  }

  const currentWord = reviewWords[currentIndex];

  return (
    <div className="review-container">
      <div className="review-stats">
        <div className="stat-item">
          <span className="stat-label">正确</span>
          <span className="stat-value correct">{stats.correct}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">错误</span>
          <span className="stat-value wrong">{stats.wrong}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">进度</span>
          <span className="stat-value">{currentIndex + 1}/{reviewWords.length}</span>
        </div>
      </div>

      <div className="review-card">
        <div className="word-header">
          <h2>{currentWord.word}</h2>
          <button 
            className="audio-btn"
            onClick={() => playAudio(currentWord.word)}
            title="播放发音"
            aria-label="播放发音"
          >
            <SoundOutlined className="audio-icon" />
          </button>
        </div>

        {showAnswer ? (
          <div className="word-details">
            <p className="meaning">{currentWord.meaning}</p>
            <p className="example">{currentWord.example}</p>
            <div className="answer-buttons">
              <button 
                className="answer-btn correct"
                onClick={() => handleAnswer(true)}
              >
                <CheckOutlined /> 认识
              </button>
              <button 
                className="answer-btn wrong"
                onClick={() => handleAnswer(false)}
              >
                <CloseOutlined /> 不认识
              </button>
            </div>
          </div>
        ) : (
          <button 
            className="show-answer-btn"
            onClick={() => setShowAnswer(true)}
          >
            显示答案
          </button>
        )}
      </div>

      {currentIndex === reviewWords.length - 1 && showAnswer && (
        <div className="review-complete">
          <h3>复习完成！</h3>
          <p>正确率: {Math.round((stats.correct / reviewWords.length) * 100)}%</p>
          <button 
            className="reset-btn"
            onClick={resetReview}
          >
            <RedoOutlined /> 重新复习
          </button>
        </div>
      )}
    </div>
  );
};

export default Review; 