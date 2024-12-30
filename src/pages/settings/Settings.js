import React from 'react';
import './Settings.css';

const Settings = () => {
  return (
    <div className="settings-container">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">设置</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">基本设置</h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                每日学习目标
              </label>
              <input
                type="number"
                min="1"
                defaultValue={50}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                提醒时间
              </label>
              <input
                type="time"
                defaultValue="09:00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 