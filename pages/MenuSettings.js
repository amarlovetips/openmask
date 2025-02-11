import { useState, useEffect } from 'react';
import './MenuSettings.css';

function MenuSettings() {
  const [menuItems, setMenuItems] = useState(() => {
    const savedItems = localStorage.getItem('navMenuItems');
    return savedItems ? JSON.parse(savedItems) : [
      { id: 1, title: 'Marketplace', path: '/marketplace', order: 1, isActive: true },
      { id: 2, title: 'Create', path: '/create', order: 2, isActive: true },
    ];
  });

  const [newItem, setNewItem] = useState({ title: '', path: '' });
  const [editingItem, setEditingItem] = useState(null);

  // Save to localStorage whenever menuItems changes
  useEffect(() => {
    localStorage.setItem('navMenuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.path) return;

    setMenuItems(prev => [...prev, {
      id: Date.now(),
      ...newItem,
      order: prev.length + 1,
      isActive: true
    }]);
    setNewItem({ title: '', path: '' });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    setMenuItems(prev => prev.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleActive = (id) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

  const handleReorder = (id, direction) => {
    setMenuItems(prev => {
      const items = [...prev];
      const index = items.findIndex(item => item.id === id);
      if (direction === 'up' && index > 0) {
        [items[index], items[index - 1]] = [items[index - 1], items[index]];
      } else if (direction === 'down' && index < items.length - 1) {
        [items[index], items[index + 1]] = [items[index + 1], items[index]];
      }
      return items.map((item, i) => ({ ...item, order: i + 1 }));
    });
  };

  return (
    <div className="menu-settings">
      <h1>Menu Settings</h1>
      
      <div className="settings-section">
        <h2>Add New Menu Item</h2>
        <form onSubmit={handleAddItem} className="menu-form">
          <div className="form-group">
            <label>Menu Title</label>
            <input
              type="text"
              placeholder="e.g., About Us"
              value={newItem.title}
              onChange={e => setNewItem(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label>Menu Path</label>
            <input
              type="text"
              placeholder="e.g., /about"
              value={newItem.path}
              onChange={e => setNewItem(prev => ({ ...prev, path: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className="add-btn">Add Menu Item</button>
        </form>
      </div>

      <div className="settings-section">
        <h2>Menu Items</h2>
        <div className="menu-items-list">
          {menuItems.map((item, index) => (
            <div key={item.id} className={`menu-item ${!item.isActive ? 'inactive' : ''}`}>
              {editingItem?.id === item.id ? (
                <form onSubmit={handleUpdateItem} className="edit-form">
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={e => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                  <input
                    type="text"
                    value={editingItem.path}
                    onChange={e => setEditingItem(prev => ({ ...prev, path: e.target.value }))}
                    required
                  />
                  <div className="edit-actions">
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" onClick={() => setEditingItem(null)} className="cancel-btn">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="menu-item-info">
                    <span className="menu-title">{item.title}</span>
                    <span className="menu-path">{item.path}</span>
                  </div>
                  <div className="menu-item-actions">
                    <button onClick={() => handleReorder(item.id, 'up')} disabled={index === 0}>↑</button>
                    <button onClick={() => handleReorder(item.id, 'down')} disabled={index === menuItems.length - 1}>↓</button>
                    <button onClick={() => handleToggleActive(item.id)} className={item.isActive ? 'deactivate-btn' : 'activate-btn'}>
                      {item.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => handleEditItem(item)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteItem(item.id)} className="delete-btn">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuSettings; 