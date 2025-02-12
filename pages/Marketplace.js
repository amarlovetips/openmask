import { useState } from 'react';
import { mockNFTs } from '../data/mockNFTs';
import styles from '../styles/components/Marketplace.module.css';
import Image from 'next/image';

function Marketplace() {
  const [nfts] = useState(mockNFTs);

  return (
    <div className="marketplace">
      <h1>NFT Marketplace</h1>
      <div className="filters">
        <input type="text" placeholder="Search NFTs..." />
        <select>
          <option value="">All Categories</option>
          <option value="art">Art</option>
          <option value="photography">Photography</option>
          <option value="music">Music</option>
        </select>
        <select>
          <option value="">Price Range</option>
          <option value="0-1">0-1 ETH</option>
          <option value="1-5">1-5 ETH</option>
          <option value="5+">5+ ETH</option>
        </select>
      </div>
      <div className="nft-grid">
        {nfts.map((nft) => (
          <div key={nft.id} className="nft-card">
            <Image 
              src={nft.image}
              alt={nft.title}
              width={300}
              height={300}
              priority={true}
            />
            <div className="nft-info">
              <h3>{nft.title}</h3>
              <p>{nft.description}</p>
              <div className="price">{nft.price}</div>
              <button className="buy-btn">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace; 