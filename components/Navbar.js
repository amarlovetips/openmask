import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useWallet } from '../context/WalletContext';
import { useWebsite } from '../context/WebsiteContext';
import styles from '../styles/components/Navbar.module.css';

export default function Navbar() {
  const router = useRouter();
  const { account, connectWallet } = useWallet();
  const { websiteSettings } = useWebsite();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navBrand}>
        <Link href="/">
          <Image 
            src={websiteSettings.logo} 
            alt="Logo" 
            width={40} 
            height={40}
            priority={true}
          />
        </Link>
      </div>

      <div className={styles.navMenu}>
        <Link href="/marketplace" className={styles.navLink}>
          Marketplace
        </Link>
        <Link href="/create" className={styles.navLink}>
          Create
        </Link>
        {account ? (
          <Link href="/profile" className={styles.navLink}>
            Profile
          </Link>
        ) : (
          <button onClick={connectWallet} className={styles.walletButton}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
} 