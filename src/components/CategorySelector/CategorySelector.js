import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onSelect }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">词汇分类</h2>
    <div className="flex flex-wrap gap-3">
      {Object.entries(categories).map(([key, category]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all
            ${selectedCategory === key
              ? 'bg-primary-500 text-white shadow-sm ring-2 ring-primary-200'
              : 'bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-50'
            } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
        >
          <span className="flex items-center gap-2">
            {category.name}
            {category.count && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === key 
                  ? 'bg-white/20 text-white' 
                  : 'bg-primary-50 text-primary-600'
              }`}>
                {category.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default CategorySelector; 