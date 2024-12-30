import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './UserStatus.css';

const UserStatus = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="user-status">
        <button className="login-btn" onClick={() => navigate('/login')}>
          登录
        </button>
      </div>
    );
  }

  return (
    <div className="user-status">
      <span className="username">{user.username}</span>
      <button className="logout-btn" onClick={handleLogout}>
        退出登录
      </button>
    </div>
  );
};

export default UserStatus; 