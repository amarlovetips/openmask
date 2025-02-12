import { useState } from 'react';
import { mockNFTs } from '../data/mockNFTs';
import styles from '../styles/components/Profile.module.css';
import Image from 'next/image';

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
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <Image 
            src={userProfile.avatar}
            alt="Profile"
            width={150}
            height={150}
            className={styles.profileImage}
            priority={true}
          />
          <div className={styles.profileDetails}>
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

      <div className={styles.nftGrid}>
        {nfts.map((nft) => (
          <div key={nft.id} className={styles.nftCard}>
            <Image 
              src={nft.image}
              alt={nft.title}
              width={250}
              height={250}
              priority={true}
            />
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
  );
}

export default Profile; 