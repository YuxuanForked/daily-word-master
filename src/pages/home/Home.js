import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { useUser } from '../../context/UserContext';
import API_URLS, { fetchConfig } from '../../config/api';
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useUser();

  // 学习进度图表配置
  const getProgressOption = () => ({
    title: {
      text: '学习进度统计',
      left: 'center',
      textStyle: {
        color: '#333',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}个 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [
      {
        name: '学习进度',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}: {c}个'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        data: [
          { 
            value: stats?.readCount || 0, 
            name: '已阅读',
            itemStyle: { color: '#1976d2' }
          },
          { 
            value: stats?.memoryCount || 0, 
            name: '已记忆',
            itemStyle: { color: '#2196f3' }
          },
          { 
            value: stats?.dictationCount || 0, 
            name: '已听写',
            itemStyle: { color: '#64b5f6' }
          }
        ]
      }
    ]
  });

  // 每周学习趋势图表配置
  const getTrendOption = () => ({
    title: {
      text: '近7天学习趋势',
      left: 'center',
      textStyle: {
        color: '#333',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['阅读', '记忆', '听写'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '阅读',
        type: 'line',
        smooth: true,
        data: [10, 15, 8, 20, 12, 18, 15],
        itemStyle: { color: '#1976d2' }
      },
      {
        name: '记忆',
        type: 'line',
        smooth: true,
        data: [5, 8, 12, 6, 10, 15, 8],
        itemStyle: { color: '#2196f3' }
      },
      {
        name: '听写',
        type: 'line',
        smooth: true,
        data: [3, 5, 7, 4, 8, 6, 10],
        itemStyle: { color: '#64b5f6' }
      }
    ]
  });

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        const response = await fetch(API_URLS.userStats, {
          ...fetchConfig,
          method: 'GET'
        });
        const data = await response.json();
        
        if (!mounted) return;

        if (response.ok) {
          setStats(data.stats);
        } else {
          setError(data.message || '获取数据失败');
        }
      } catch (err) {
        if (mounted) {
          setError('网络错误，请稍后��试');
          console.error('获取统计数据失败:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-error">
        <p>⚠️ {error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          重试
        </button>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="welcome-section">
        <h1>欢迎回来，{user?.username}</h1>
        <p>继续您的学习之旅</p>
      </div>

      <div className="stats-overview grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-number">{stats?.readCount || 0}</div>
          <div className="stat-label">已阅读单词</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🧠</div>
          <div className="stat-number">{stats?.memoryCount || 0}</div>
          <div className="stat-label">已背诵单词</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✍️</div>
          <div className="stat-number">{stats?.dictationCount || 0}</div>
          <div className="stat-label">已听写单词</div>
        </div>
      </div>

      <div className="charts-container grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="chart-box">
          <ReactEcharts 
            option={getProgressOption()} 
            style={{ height: '400px' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
        <div className="chart-box">
          <ReactEcharts 
            option={getTrendOption()} 
            style={{ height: '400px' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home; 