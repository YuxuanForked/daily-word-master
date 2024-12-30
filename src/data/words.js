export const wordCategories = {
  essential: {
    name: '核心词汇',
    words: [
      {
        word: 'abandon',
        phonetic: '/əˈbændən/',
        meaning: 'v. 放弃，遗弃',
        example: 'He decided to abandon his studies and start a business.',
        synonyms: ['desert', 'forsake', 'give up'],
        audioUrl: 'https://dict.youdao.com/dictvoice?audio=abandon&type=1'
      },
      {
        word: 'abstract',
        phonetic: '/ˈæbstrækt/',
        meaning: 'adj. 抽象的；n. 摘要',
        example: 'The paper began with an abstract of the main findings.',
        synonyms: ['theoretical', 'conceptual']
      },
      {
        word: 'academic',
        phonetic: '/ˌækəˈdemɪk/',
        meaning: 'adj. 学术的，教学的',
        example: 'Her academic achievements were impressive.',
        synonyms: ['scholarly', 'educational']
      }
    ]
  },
  phrases: {
    name: '常用短语',
    words: [
      {
        phrase: 'in terms of',
        meaning: '就...而言，在...方面',
        example: 'In terms of experience, she was the best candidate.',
        usage: '用于具体说明讨论的方面或角度'
      },
      {
        phrase: 'on the grounds that',
        meaning: '由于，基于...的理由',
        example: 'He refused the offer on the grounds that the salary was too low.',
        usage: '用于解释原因或理由'
      },
      {
        phrase: 'with regard to',
        meaning: '关于，就...而言',
        example: 'With regard to your request, we need more time to consider.',
        usage: '用于引出讨论的话题'
      }
    ]
  },
  writing: {
    name: '写作常用',
    words: [
      {
        phrase: 'It is widely acknowledged that...',
        meaning: '众所周知...',
        example: 'It is widely acknowledged that exercise is good for health.',
        usage: '用于开头，引出普遍认同的观点'
      },
      {
        phrase: 'There is no denying that...',
        meaning: '不可否认...',
        example: 'There is no denying that technology has changed our lives.',
        usage: '用于承认某个事实或观点'
      },
      {
        phrase: 'From my perspective...',
        meaning: '从我的角度来看...',
        example: 'From my perspective, this approach has both advantages and disadvantages.',
        usage: '用于表达个人观点'
      }
    ]
  }
};

// 生成指定日期的单词
export const generateDailyWords = (date) => {
  const allWords = wordCategories.essential.words;
  
  // 使用日期作为随机种子，确保同一天生成相同的单词
  let seedValue = new Date(date).getTime();
  const shuffledWords = [...allWords].sort(() => {
    const x = Math.sin(seedValue++) * 10000;
    return 0.5 - (x - Math.floor(x));
  });
  
  // 确保每天固定30个单词
  const dailyWords = shuffledWords.slice(0, 30);

  return {
    date,
    words: dailyWords,
    total: 30,
    progress: {
      learned: 0,
      mastered: 0
    }
  };
}; 