import { useState, useEffect } from 'react';
import styles from '../styles/components/MenuSettings.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.title}>Menu Settings</h1>
      
      <div className={styles.settingsSection}>
        <h2>Add New Menu Item</h2>
        <form onSubmit={handleAddItem} className={styles.menuForm}>
          <div className={styles.formGroup}>
            <label>Menu Title</label>
            <input
              type="text"
              placeholder="e.g., About Us"
              value={newItem.title}
              onChange={e => setNewItem(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Menu Path</label>
            <input
              type="text"
              placeholder="e.g., /about"
              value={newItem.path}
              onChange={e => setNewItem(prev => ({ ...prev, path: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className={styles.addBtn}>Add Menu Item</button>
        </form>
      </div>

      <div className={styles.settingsSection}>
        <h2>Menu Items</h2>
        <div className={styles.menuItemsList}>
          {menuItems.map((item, index) => (
            <div key={item.id} className={`${styles.menuItem} ${!item.isActive ? styles.inactive : ''}`}>
              {editingItem?.id === item.id ? (
                <form onSubmit={handleUpdateItem} className={styles.editForm}>
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
                  <div className={styles.editActions}>
                    <button type="submit" className={styles.saveBtn}>Save</button>
                    <button type="button" onClick={() => setEditingItem(null)} className={styles.cancelBtn}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className={styles.menuItemInfo}>
                    <span className={styles.menuTitle}>{item.title}</span>
                    <span className={styles.menuPath}>{item.path}</span>
                  </div>
                  <div className={styles.menuItemActions}>
                    <button onClick={() => handleReorder(item.id, 'up')} disabled={index === 0}>↑</button>
                    <button onClick={() => handleReorder(item.id, 'down')} disabled={index === menuItems.length - 1}>↓</button>
                    <button onClick={() => handleToggleActive(item.id)} className={item.isActive ? styles.deactivateBtn : styles.activateBtn}>
                      {item.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => handleEditItem(item)} className={styles.editBtn}>Edit</button>
                    <button onClick={() => handleDeleteItem(item.id)} className={styles.deleteBtn}>Delete</button>
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