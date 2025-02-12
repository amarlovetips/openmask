import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/AdminHome.module.css';

function AdminHome() {
  const [systemInfo] = useState({
    currentTime: new Date().toLocaleString(),
    serverStatus: 'Online',
    lastBackup: '2024-02-11 10:30 AM',
    systemVersion: '1.0.0',
    nodeVersion: 'v18.x.x',
    totalUsers: 1234,
    totalNFTs: 567,
    storageUsed: '45.8 GB',
    cpuUsage: '32%',
    memoryUsage: '2.4 GB'
  });

  const navigate = useNavigate();

  const quickLinks = [
    { title: 'Dashboard', path: '/joynobiadmin/dashboard', icon: '📊' },
    { title: 'Website Settings', path: '/joynobiadmin/website-settings', icon: '⚙️' },
    { title: 'User Management', path: '/joynobiadmin/users', icon: '👥' },
    { title: 'NFT Management', path: '/joynobiadmin/nfts', icon: '🖼️' }
  ];

  return (
    <div className="admin-home">
      <div className="admin-header">
        <h1>Admin Control Panel</h1>
        <p className="current-time">
          Current Time: {new Date().toLocaleString()}
        </p>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <h3>System Status</h3>
          <p className="status-online">{systemInfo.serverStatus}</p>
        </div>
        <div className="stat-card">
          <h3>Last Backup</h3>
          <p>{systemInfo.lastBackup}</p>
        </div>
        <div className="stat-card">
          <h3>System Version</h3>
          <p>{systemInfo.systemVersion}</p>
        </div>
        <div className="stat-card">
          <h3>Node Version</h3>
          <p>{systemInfo.nodeVersion}</p>
        </div>
      </div>

      <div className="system-metrics">
        <h2>System Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="metric-label">Total Users</span>
            <span className="metric-value">{systemInfo.totalUsers}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Total NFTs</span>
            <span className="metric-value">{systemInfo.totalNFTs}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Storage Used</span>
            <span className="metric-value">{systemInfo.storageUsed}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">CPU Usage</span>
            <span className="metric-value">{systemInfo.cpuUsage}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Memory Usage</span>
            <span className="metric-value">{systemInfo.memoryUsage}</span>
          </div>
        </div>
      </div>

      <div className="quick-links">
        <h2>Quick Links</h2>
        <div className="links-grid">
          {quickLinks.map((link, index) => (
            <button
              key={index}
              className="quick-link-card"
              onClick={() => navigate(link.path)}
            >
              <span className="link-icon">{link.icon}</span>
              <span className="link-title">{link.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminHome; 