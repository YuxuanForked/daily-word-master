import React, { createContext, useContext, useState, useEffect } from 'react';
import { wordCategories as initialWordCategories, generateDailyWords } from '../data/words';

const WordContext = createContext();

export const WordProvider = ({ children }) => {
  const [wordCategories] = useState(initialWordCategories);
  const [dailyWords, setDailyWords] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const cachedDailyWords = localStorage.getItem(`dailyWords_${today}`);
    
    if (cachedDailyWords) {
      setDailyWords(JSON.parse(cachedDailyWords));
    } else {
      const newDailyWords = generateDailyWords();
      setDailyWords(newDailyWords);
      localStorage.setItem(`dailyWords_${today}`, JSON.stringify(newDailyWords));
    }
  }, []);

  return (
    <WordContext.Provider value={{ wordCategories, dailyWords }}>
      {children}
    </WordContext.Provider>
  );
};

export const useWords = () => {
  const context = useContext(WordContext);
  if (!context) {
    throw new Error('useWords must be used within a WordProvider');
  }
  return context;
}; 