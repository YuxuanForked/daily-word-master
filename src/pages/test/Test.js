import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useWords } from '../../context/WordContext';
import { SoundOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import './Test.css';

const Test = () => {
  const [testWords, setTestWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  const { user } = useUser();
  const { wordCategories, dailyWords } = useWords();

  useEffect(() => {
    if (!dailyWords) return;

    const today = new Date().toISOString().split('T')[0];
    const progress = JSON.parse(localStorage.getItem(`wordProgress_${user.username}_${today}`)) || {};
    
    const wordsToTest = Object.entries(progress)
      .filter(([_, status]) => status === 'mastered')
      .map(([key]) => {
        const [listType, index] = key.split('-');
        return listType === 'daily' ? dailyWords.words[index] : wordCategories[listType].words[index];
      })
      .filter(Boolean);

    setTestWords(wordsToTest);
  }, [user.username, dailyWords, wordCategories]);

  const playAudio = async (word) => {
    try {
      const audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=1`);
      await audio.play();
    } catch (error) {
      console.error('音频播放失败:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentWord = testWords[currentIndex];
    const isCorrect = userInput.toLowerCase().trim() === currentWord.word.toLowerCase();
    
    setResults(prev => [...prev, {
      word: currentWord.word,
      userInput: userInput.trim(),
      isCorrect
    }]);

    setUserInput('');
    setShowResult(true);
  };

  const nextWord = () => {
    if (currentIndex < testWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowResult(false);
    }
  };

  if (testWords.length === 0) {
    return (
      <div className="test-empty">
        <h2>暂无可测试的单词</h2>
        <p>请先在学习页面标记一些单词为"已掌握"</p>
      </div>
    );
  }

  const currentWord = testWords[currentIndex];

  return (
    <div className="test-container">
      <div className="test-progress">
        <span>进度: {currentIndex + 1}/{testWords.length}</span>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / testWords.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="test-card">
        <div className="word-meaning">
          <h3>{currentWord.meaning}</h3>
          <button 
            className="audio-btn"
            onClick={() => playAudio(currentWord.word)}
            title="播放发音"
            aria-label="播放发音"
          >
            <SoundOutlined className="audio-icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <EditOutlined className="input-icon" />
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="请输入听到的单词"
              autoFocus
              disabled={showResult}
            />
          </div>
          {!showResult && (
            <button type="submit" className="submit-btn">
              <CheckOutlined /> 提交答案
            </button>
          )}
        </form>

        {showResult && (
          <div className={`result ${results[results.length - 1].isCorrect ? 'correct' : 'wrong'}`}>
            <h4>{results[results.length - 1].isCorrect ? '正确！' : '错误！'}</h4>
            <p>正确答案: {currentWord.word}</p>
            <p>你的答案: {results[results.length - 1].userInput}</p>
            {currentIndex < testWords.length - 1 ? (
              <button onClick={nextWord} className="next-btn">
                下一个
              </button>
            ) : (
              <div className="test-complete">
                <h3>测试完成！</h3>
                <p>正确率: {Math.round((results.filter(r => r.isCorrect).length / testWords.length) * 100)}%</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Test; 