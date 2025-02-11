import { useState } from 'react';
import { mockNFTs } from '../data/mockNFTs';
import './AdminDashboard.css';

function AdminDashboard({ section = 'dashboard' }) {
  const [nfts] = useState(mockNFTs);
  const [stats] = useState({
    totalUsers: 1234,
    totalNFTs: 567,
    totalVolume: "1,234 ETH",
    activeListings: 89
  });

  const renderDashboard = () => (
    <div className="section-content">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total NFTs</h3>
          <p>{stats.totalNFTs}</p>
        </div>
        <div className="stat-card">
          <h3>Total Volume</h3>
          <p>{stats.totalVolume}</p>
        </div>
        <div className="stat-card">
          <h3>Active Listings</h3>
          <p>{stats.activeListings}</p>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="section-content">
      <h2>User Management</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>User1</td>
            <td>user1@example.com</td>
            <td>Active</td>
            <td>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
          {/* Add more user rows as needed */}
        </tbody>
      </table>
    </div>
  );

  const renderNFTs = () => (
    <div className="section-content">
      <h2>NFT Management</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Creator</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {nfts.map(nft => (
            <tr key={nft.id}>
              <td>{nft.id}</td>
              <td>{nft.title}</td>
              <td>{nft.creator}</td>
              <td>{nft.price}</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    switch (section) {
      case 'users':
        return renderUsers();
      case 'nfts':
        return renderNFTs();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="admin-dashboard">
      {renderContent()}
    </div>
  );
}

export default AdminDashboard; 