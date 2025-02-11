import { Link, useLocation } from 'react-router-dom';
import './AdminLayout.css';

function AdminLayout({ children }) {
  const location = useLocation();

  const menuItems = [
    { path: '/joynobiadmin', title: 'Admin Home', icon: '🏠' },
    { path: '/joynobiadmin/dashboard', title: 'Dashboard', icon: '📊' },
    { path: '/joynobiadmin/menu-settings', title: 'Menu Settings', icon: '📝' },
    { path: '/joynobiadmin/website-settings', title: 'Website Settings', icon: '⚙️' },
    { path: '/joynobiadmin/users', title: 'User Management', icon: '👥' },
    { path: '/joynobiadmin/nfts', title: 'NFT Management', icon: '🖼️' },
    { path: '/joynobiadmin/wallet-menu-settings', title: 'Wallet Menu Settings', icon: '👛' }
  ];

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout; 