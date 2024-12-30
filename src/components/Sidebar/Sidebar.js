import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserStatus from '../UserStatus/UserStatus';
import { useUser } from '../../context/UserContext';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useUser();

  // 如果未登录或在登录相关页面，不显示侧边栏
  if (!user || ['/login', '/register', '/forgot-password'].includes(location.pathname)) {
    return null;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>单词学习</h2>
      </div>
      <UserStatus />
      <nav className="sidebar-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <span className="icon">📊</span>
          学习概况
        </Link>
        <Link to="/learn" className={location.pathname === '/learn' ? 'active' : ''}>
          <span className="icon">📚</span>
          开始学习
        </Link>
        <Link to="/review" className={location.pathname === '/review' ? 'active' : ''}>
          <span className="icon">🔄</span>
          复习单词
        </Link>
        <Link to="/test" className={location.pathname === '/test' ? 'active' : ''}>
          <span className="icon">✍️</span>
          听写测试
        </Link>
        <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
          <span className="icon">⚙️</span>
          设置
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar; 