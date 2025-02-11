import { useWebsite } from '../context/WebsiteContext';
import { useWallet } from '../context/WalletContext';

export default function Home() {
  const { websiteSettings } = useWebsite();
  const { account } = useWallet();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">
          Welcome to {websiteSettings.title}
        </h1>
        <p className="hero-description">
          {websiteSettings.description}
        </p>
        {!account && (
          <p className="connect-prompt">
            Connect your wallet to start exploring NFTs
          </p>
        )}
      </div>

      <div className="features-section">
        <div className="feature">
          <h2>Create</h2>
          <p>Create and mint your own NFTs</p>
        </div>
        <div className="feature">
          <h2>Trade</h2>
          <p>Buy and sell NFTs on our marketplace</p>
        </div>
        <div className="feature">
          <h2>Collect</h2>
          <p>Build your NFT collection</p>
        </div>
      </div>
    </div>
  );
} 