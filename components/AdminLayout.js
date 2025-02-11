import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { path: '/joynobiadmin', title: 'Admin Home', icon: '🏠' },
    { path: '/joynobiadmin/dashboard', title: 'Dashboard', icon: '📊' },
    { path: '/joynobiadmin/menu-settings', title: 'Menu Settings', icon: '📝' },
    { path: '/joynobiadmin/website-settings', title: 'Website Settings', icon: '⚙️' },
    { path: '/joynobiadmin/users', title: 'User Management', icon: '👥' },
    { path: '/joynobiadmin/nfts', title: 'NFT Management', icon: '🖼️' },
    { path: '/joynobiadmin/wallet-menu-settings', title: 'Wallet Menu Settings', icon: '👛' }
  ];

  if (!mounted) return null;

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
              href={item.path}
              className={`sidebar-link ${router.pathname === item.path ? 'active' : ''}`}
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