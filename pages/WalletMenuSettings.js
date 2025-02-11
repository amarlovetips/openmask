import { useState, useEffect } from 'react';
import './WalletMenuSettings.css';

function WalletMenuSettings() {
  const [menuItems, setMenuItems] = useState(() => {
    const savedItems = localStorage.getItem('walletMenuItems');
    return savedItems ? JSON.parse(savedItems) : [
      { id: 1, title: 'My NFTs', path: '/my-nfts', icon: '🖼️', isActive: true },
      { id: 2, title: 'Transactions', path: '/transactions', icon: '📝', isActive: true },
      { id: 3, title: 'Settings', path: '/wallet-settings', icon: '⚙️', isActive: true },
    ];
  });

  const [wethContracts, setWethContracts] = useState(() => {
    const savedContracts = localStorage.getItem('wethContracts');
    return savedContracts ? JSON.parse(savedContracts) : {
      '1': {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        name: 'Ethereum Mainnet',
        isActive: true
      },
      '11155111': {
        address: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
        name: 'Sepolia Testnet',
        isActive: true
      }
    };
  });

  const [newMenuItem, setNewMenuItem] = useState({ title: '', path: '', icon: '' });
  const [newContract, setNewContract] = useState({ chainId: '', name: '', address: '' });

  useEffect(() => {
    localStorage.setItem('walletMenuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('wethContracts', JSON.stringify(wethContracts));
  }, [wethContracts]);

  const handleAddMenuItem = (e) => {
    e.preventDefault();
    setMenuItems(prev => [...prev, {
      id: Date.now(),
      ...newMenuItem,
      isActive: true
    }]);
    setNewMenuItem({ title: '', path: '', icon: '' });
  };

  const handleAddContract = (e) => {
    e.preventDefault();
    setWethContracts(prev => ({
      ...prev,
      [newContract.chainId]: {
        address: newContract.address,
        name: newContract.name,
        isActive: true
      }
    }));
    setNewContract({ chainId: '', name: '', address: '' });
  };

  const handleToggleMenuItem = (id) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

  const handleToggleContract = (chainId) => {
    setWethContracts(prev => ({
      ...prev,
      [chainId]: {
        ...prev[chainId],
        isActive: !prev[chainId].isActive
      }
    }));
  };

  const handleDeleteMenuItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const handleDeleteContract = (chainId) => {
    setWethContracts(prev => {
      const newContracts = { ...prev };
      delete newContracts[chainId];
      return newContracts;
    });
  };

  return (
    <div className="wallet-menu-settings">
      <h1>Wallet Menu Settings</h1>

      <div className="settings-section">
        <h2>Menu Items</h2>
        <form onSubmit={handleAddMenuItem} className="add-form">
          <input
            type="text"
            placeholder="Menu Title"
            value={newMenuItem.title}
            onChange={e => setNewMenuItem(prev => ({ ...prev, title: e.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Menu Path"
            value={newMenuItem.path}
            onChange={e => setNewMenuItem(prev => ({ ...prev, path: e.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Menu Icon (emoji)"
            value={newMenuItem.icon}
            onChange={e => setNewMenuItem(prev => ({ ...prev, icon: e.target.value }))}
            required
          />
          <button type="submit">Add Menu Item</button>
        </form>

        <div className="items-list">
          {menuItems.map(item => (
            <div key={item.id} className={`list-item ${!item.isActive ? 'inactive' : ''}`}>
              <div className="item-info">
                <span className="item-icon">{item.icon}</span>
                <span className="item-title">{item.title}</span>
                <span className="item-path">{item.path}</span>
              </div>
              <div className="item-actions">
                <button 
                  onClick={() => handleToggleMenuItem(item.id)}
                  className={item.isActive ? 'deactivate' : 'activate'}
                >
                  {item.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => handleDeleteMenuItem(item.id)} className="delete">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h2>WETH Contracts</h2>
        <form onSubmit={handleAddContract} className="add-form">
          <input
            type="text"
            placeholder="Chain ID"
            value={newContract.chainId}
            onChange={e => setNewContract(prev => ({ ...prev, chainId: e.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Network Name"
            value={newContract.name}
            onChange={e => setNewContract(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Contract Address"
            value={newContract.address}
            onChange={e => setNewContract(prev => ({ ...prev, address: e.target.value }))}
            required
          />
          <button type="submit">Add Contract</button>
        </form>

        <div className="items-list">
          {Object.entries(wethContracts).map(([chainId, contract]) => (
            <div key={chainId} className={`list-item ${!contract.isActive ? 'inactive' : ''}`}>
              <div className="item-info">
                <span className="item-title">{contract.name}</span>
                <span className="item-path">{contract.address}</span>
                <span className="chain-id">Chain ID: {chainId}</span>
              </div>
              <div className="item-actions">
                <button 
                  onClick={() => handleToggleContract(chainId)}
                  className={contract.isActive ? 'deactivate' : 'activate'}
                >
                  {contract.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => handleDeleteContract(chainId)} className="delete">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WalletMenuSettings; 