import { useState } from 'react';
import { mockNFTs } from '../data/mockNFTs';
import './Profile.css';

function Profile() {
  const [activeTab, setActiveTab] = useState('collected');
  const [nfts] = useState(mockNFTs);

  const userProfile = {
    username: "NFT Collector",
    address: "0x1234...5678",
    bio: "Passionate NFT collector and digital art enthusiast",
    avatar: "https://via.placeholder.com/150",
    joinDate: "January 2024",
    totalValue: "5.67 ETH",
    followers: 234,
    following: 156
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-info">
          <img src={userProfile.avatar} alt="Profile" className="profile-avatar" />
          <div className="profile-details">
            <h1>{userProfile.username}</h1>
            <p className="address">{userProfile.address}</p>
            <p className="bio">{userProfile.bio}</p>
            <div className="profile-stats">
              <div className="stat">
                <span>Total Value</span>
                <span>{userProfile.totalValue}</span>
              </div>
              <div className="stat">
                <span>Followers</span>
                <span>{userProfile.followers}</span>
              </div>
              <div className="stat">
                <span>Following</span>
                <span>{userProfile.following}</span>
              </div>
            </div>
          </div>
        </div>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button 
            className={activeTab === 'collected' ? 'active' : ''} 
            onClick={() => setActiveTab('collected')}
          >
            Collected
          </button>
          <button 
            className={activeTab === 'created' ? 'active' : ''} 
            onClick={() => setActiveTab('created')}
          >
            Created
          </button>
          <button 
            className={activeTab === 'favorited' ? 'active' : ''} 
            onClick={() => setActiveTab('favorited')}
          >
            Favorited
          </button>
          <button 
            className={activeTab === 'activity' ? 'active' : ''} 
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
        </div>

        <div className="nft-grid">
          {nfts.map((nft) => (
            <div key={nft.id} className="nft-card">
              <img src={nft.image} alt={nft.title} />
              <div className="nft-info">
                <h3>{nft.title}</h3>
                <p>{nft.description}</p>
                <div className="price">{nft.price}</div>
                <button className="list-btn">List for Sale</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile; 