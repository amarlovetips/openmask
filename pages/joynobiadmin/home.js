import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/components/AdminHome.module.css';

export default function AdminHome() {
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

  const router = useRouter();

  const quickLinks = [
    { title: 'Dashboard', path: '/joynobiadmin/dashboard', icon: '📊' },
    { title: 'Website Settings', path: '/joynobiadmin/website-settings', icon: '⚙️' },
    { title: 'User Management', path: '/joynobiadmin/users', icon: '👥' },
    { title: 'NFT Management', path: '/joynobiadmin/nfts', icon: '🖼️' }
  ];

  return (
    <div className={styles.adminHome}>
      <div className={styles.adminHeader}>
        <h1>Admin Control Panel</h1>
        <p className={styles.currentTime}>
          Current Time: {new Date().toLocaleString()}
        </p>
      </div>

      <div className={styles.quickStats}>
        <div className={styles.statCard}>
          <h3>System Status</h3>
          <p className={styles.statusOnline}>{systemInfo.serverStatus}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Last Backup</h3>
          <p>{systemInfo.lastBackup}</p>
        </div>
        <div className={styles.statCard}>
          <h3>System Version</h3>
          <p>{systemInfo.systemVersion}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Node Version</h3>
          <p>{systemInfo.nodeVersion}</p>
        </div>
      </div>

      <div className={styles.systemMetrics}>
        <h2>System Metrics</h2>
        <div className={styles.metricsGrid}>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>Total Users</span>
            <span className={styles.metricValue}>{systemInfo.totalUsers}</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>Total NFTs</span>
            <span className={styles.metricValue}>{systemInfo.totalNFTs}</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>Storage Used</span>
            <span className={styles.metricValue}>{systemInfo.storageUsed}</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>CPU Usage</span>
            <span className={styles.metricValue}>{systemInfo.cpuUsage}</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>Memory Usage</span>
            <span className={styles.metricValue}>{systemInfo.memoryUsage}</span>
          </div>
        </div>
      </div>

      <div className={styles.quickLinks}>
        <h2>Quick Links</h2>
        <div className={styles.linksGrid}>
          {quickLinks.map((link, index) => (
            <button
              key={index}
              className={styles.quickLinkCard}
              onClick={() => router.push(link.path)}
            >
              <span className={styles.linkIcon}>{link.icon}</span>
              <span className={styles.linkTitle}>{link.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 