import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API_URLS, { fetchConfig } from '../../config/api';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URLS.forgotPassword, {
        ...fetchConfig,
        method: 'POST',
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus({
          type: 'success',
          message: '重置密码链接已发送到您的邮箱'
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || '发送重置链接失败'
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: '网络错误，请稍后重试'
      });
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <div className="forgot-password-header">
          <h2>重置密码</h2>
          <p>我们将向您的邮箱发送重置密码链接</p>
        </div>
        {status.message && (
          <div className={`status-message ${status.type}`}>
            <span>{status.message}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>邮箱地址</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入您的注册��箱"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            发送重置链接
          </button>
        </form>
        <div className="auth-links">
          <Link to="/login">返回登录</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 