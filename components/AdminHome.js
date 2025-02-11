import { useState, useEffect } from 'react';
import { FaUsers, FaImages, FaShoppingCart, FaChartLine, FaUsersCog } from 'react-icons/fa';
import { statsService } from '../services/StatsService';

export default function AdminHome() {
  const [stats, setStats] = useState(statsService.getStats());

  useEffect(() => {
    // Update stats every 5 seconds
    const interval = setInterval(() => {
      setStats(statsService.getStats());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, icon: Icon, suffix = '', color = 'emerald' }) => (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        <Icon />
      </div>
      <div className="stat-content">
        <h3>{title}</h3>
        <p>{value.toLocaleString()}{suffix}</p>
      </div>
    </div>
  );

  return (
    <div className="admin-home">
      {/* Overall Statistics */}
      <section className="stats-section">
        <h2 className="section-title">Overall Statistics</h2>
        <div className="stats-grid">
          <StatCard title="Total Users" value={stats.totalUsers} icon={FaUsers} />
          <StatCard title="Total Collections" value={stats.totalCollections} icon={FaImages} />
          <StatCard title="Total Items" value={stats.totalItems} icon={FaImages} />
          <StatCard title="Total Transactions" value={stats.totalTransactions} icon={FaShoppingCart} />
          <StatCard title="Total Volume" value={stats.totalVolume} icon={FaChartLine} suffix=" ETH" />
        </div>
      </section>

      {/* Weekly Statistics */}
      <section className="stats-section">
        <h2 className="section-title">Last 7 Days</h2>
        <div className="stats-grid">
          <StatCard title="Active Users" value={stats.weeklyActiveUsers} icon={FaUsers} color="blue" />
          <StatCard title="New Collections" value={stats.weeklyNewCollections} icon={FaImages} color="blue" />
          <StatCard title="Transactions" value={stats.weeklyTransactions} icon={FaShoppingCart} color="blue" />
          <StatCard title="Trading Volume" value={stats.weeklyVolume} icon={FaChartLine} suffix=" ETH" color="blue" />
        </div>
      </section>

      {/* Daily Statistics */}
      <section className="stats-section">
        <h2 className="section-title">Last 24 Hours</h2>
        <div className="stats-grid">
          <StatCard title="Active Users" value={stats.dailyActiveUsers} icon={FaUsers} color="purple" />
          <StatCard title="New Collections" value={stats.dailyNewCollections} icon={FaImages} color="purple" />
          <StatCard title="Transactions" value={stats.dailyTransactions} icon={FaShoppingCart} color="purple" />
          <StatCard title="Trading Volume" value={stats.dailyVolume} icon={FaChartLine} suffix=" ETH" color="purple" />
        </div>
      </section>

      {/* Real-time Statistics */}
      <section className="stats-section">
        <h2 className="section-title">Real-time Statistics</h2>
        <div className="stats-grid">
          <StatCard title="Online Users" value={stats.onlineUsers} icon={FaUsersCog} color="orange" />
          <StatCard title="New Users Today" value={stats.todayNewUsers} icon={FaUsers} color="orange" />
        </div>
      </section>
    </div>
  );
} 