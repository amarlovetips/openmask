import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function MenuSettings() {
  const [menuItems, setMenuItems] = useState([
    { id: 1, title: 'Home', path: '/', isActive: true },
    { id: 2, title: 'Marketplace', path: '/marketplace', isActive: true },
    { id: 3, title: 'Create', path: '/create', isActive: true },
  ]);

  const handleToggle = (id) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

  return (
    <AdminLayout>
      <div className="admin-content-wrapper">
        <h1 className="page-title">Menu Settings</h1>
        <div className="menu-items-list">
          {menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <div className="menu-item-info">
                <h3>{item.title}</h3>
                <p>{item.path}</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={item.isActive}
                  onChange={() => handleToggle(item.id)}
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
} 