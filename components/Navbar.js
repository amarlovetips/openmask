import { useRouter } from 'next/router';
import Link from 'next/link';
import { useWallet } from '../context/WalletContext';
import { useWebsite } from '../context/WebsiteContext';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const { account, connectWallet } = useWallet();
  const { websiteSettings } = useWebsite();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link href="/">
          <Image 
            src={websiteSettings.logo} 
            alt="Logo" 
            width={40} 
            height={40}
          />
        </Link>
      </div>

      <div className="nav-menu">
        <Link href="/marketplace" className="nav-link">
          Marketplace
        </Link>
        <Link href="/create" className="nav-link">
          Create
        </Link>
        {account ? (
          <Link href="/profile" className="nav-link">
            Profile
          </Link>
        ) : (
          <button onClick={connectWallet} className="wallet-button">
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
} 