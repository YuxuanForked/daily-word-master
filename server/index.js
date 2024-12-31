const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// CORS 配置
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3004'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// 动态设置 CORS 响应头
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3004'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// 解析 JSON 请求体
app.use(bodyParser.json());

// 模拟用户数据 (后续会替换为数据库)
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'chang1234',
    email: 'admin@example.com',
    stats: {
      readCount: 1500,
      memoryCount: 800,
      dictationCount: 500
    }
  }
];

// 路由处理
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 这里是示例用户验证，实际应用中应该查询数据库
    if (username === 'admin' && password === 'chang1234') {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });
      
      res.status(200).json({
        success: true,
        message: '登录成功',
        user: { username, token }
      });
    } else {
      res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
});

// 注册接口
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  
  // 检查用户名是否已存在
  if (users.find(u => u.username === username)) {
    return res.status(400).json({
      success: false,
      message: '用户名已存在'
    });
  }

  // 检查邮箱是否已存在
  if (users.find(u => u.email === email)) {
    return res.status(400).json({
      success: false,
      message: '邮箱已被注册'
    });
  }

  // 创建新用户
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password // 实际应用中需要对密码进行加密
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: '注册成功'
  });
});

// 忘记密码接口
app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: '该邮箱未注册'
    });
  }

  // 这里应该实现发送重置密码邮件的逻辑
  // 为了演示，我们直接返回成功
  res.json({
    success: true,
    message: '重置密码链接已发送到您的邮箱'
  });
});

// 获取用户统计数据接口
app.get('/api/user/stats', (req, res) => {
  const userId = 1; // 在实际应用中，这应该从token中获取
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.json({
      success: true,
      stats: user.stats
    });
  } else {
    res.status(404).json({
      success: false,
      message: '用户不存在'
    });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误'
  });
});

// 优化错误处理
const server = app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try another port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
}); 