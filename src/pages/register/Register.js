import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_URLS, { fetchConfig } from '../../config/api';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    try {
      const response = await fetch(API_URLS.register, {
        ...fetchConfig,
        method: 'POST',
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        navigate('/login', { state: { message: '注册成功，请登录' } });
      } else {
        setError(data.message || '注册失败');
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <h2>创建账户</h2>
          <p>开始您的单词学习之旅</p>
        </div>
        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
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
            <label>邮箱</label>
            <input
              type="email"
              name="email"
              placeholder="请输入邮箱"
              value={formData.email}
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
          <div className="form-group">
            <label>确认密码</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="请再次输入密码"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">
            注册
          </button>
        </form>
        <div className="auth-links">
          <Link to="/login">已有账户？立即登录</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 