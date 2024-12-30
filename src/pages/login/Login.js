import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_URLS, { fetchConfig } from '../../config/api';
import { useUser } from '../../context/UserContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      console.log('Submitting login form:', formData);

      const response = await fetch(API_URLS.login, {
        ...fetchConfig,
        method: 'POST',
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Login response:', data);
      
      if (response.ok) {
        login(data.user);
        navigate('/');
      } else {
        setError(data.message || '登录失败');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('网络错误，请稍后重试');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>欢迎回来</h2>
          <p>登录您的单词学习账户</p>
          <div className="demo-account">
            <p>演示账号：admin</p>
            <p>演示密码：chang1234</p>
          </div>
        </div>
        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>用户名</label>
            <input
              type="text"
              name="username"
              placeholder="请输入用户名"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>密码</label>
            <input
              type="password"
              name="password"
              placeholder="请输入密码"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            登录
          </button>
        </form>
        <div className="auth-links">
          <Link to="/register">没有账户？立即注册</Link>
          <Link to="/forgot-password">忘记密码？</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 