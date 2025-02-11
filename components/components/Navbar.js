import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { useWebsite } from '../context/WebsiteContext';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Navbar.css';
import { useAdminAuth } from '../context/AdminAuthContext';
import WalletMenu from './WalletMenu';

function Navbar() {
  const { account, isConnected, connectMetaMask, disconnectWallet } = useWallet();
  const { websiteSettings } = useWebsite();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isAdminAuthenticated, logoutAdmin } = useAdminAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchQuery, setSearchQuery] = useState('');
  const [navMenuItems] = useState(() => {
    const savedItems = localStorage.getItem('navMenuItems');
    return savedItems ? JSON.parse(savedItems).filter(item => item.isActive) : [];
  });
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const adminMenuItems = [
    { title: 'Dashboard', path: '/joynobiadmin' },
    { title: 'Menu Settings', path: '/joynobiadmin/menu-settings' },
    { title: 'Website Settings', path: '/joynobiadmin/website-settings' },
    { title: 'User Management', path: '/joynobiadmin/users' },
    { title: 'NFT Management', path: '/joynobiadmin/nfts' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-section navbar-left">
        <Link to="/" className="navbar-brand">
          <img 
            src={isMobile ? websiteSettings.mobileLogo : websiteSettings.logo} 
            alt={websiteSettings.siteName} 
            className="navbar-logo"
          />
        </Link>
        
        <div className="main-menu">
          {navMenuItems.map(item => (
            <Link key={item.id} to={item.path}>{item.title}</Link>
          ))}
          {isAdminAuthenticated && (
            <div className="admin-dropdown">
              <button 
                className="admin-button"
                onClick={() => setShowDropdown(!showDropdown)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              >
                Admin Panel
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  {adminMenuItems.map((item, index) => (
                    <Link 
                      key={index} 
                      to={item.path}
                      onClick={() => setShowDropdown(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                  <button onClick={logoutAdmin} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="navbar-section navbar-center">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search items, collections, and accounts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="navbar-section navbar-right">
        {isConnected ? (
          <div className="wallet-info">
            <button 
              className="wallet-button"
              onClick={() => setShowWalletMenu(!showWalletMenu)}
              onBlur={() => setTimeout(() => setShowWalletMenu(false), 200)}
            >
              <div className="wallet-status">
                <span className="status-dot"></span>
                <span className="wallet-address">{formatAddress(account)}</span>
              </div>
            </button>
            {showWalletMenu && (
              <WalletMenu
                account={account}
                disconnectWallet={disconnectWallet}
                isOpen={showWalletMenu}
                onClose={() => setShowWalletMenu(false)}
              />
            )}
          </div>
        ) : (
          <button className="connect-wallet-btn" onClick={connectMetaMask}>
            <span className="wallet-icon">👛</span>
            <span>Connect Wallet</span>
          </button>
        )}
      </div>

      {/* Mobile menu button */}
      <button 
        className={`mobile-menu-btn ${showMobileMenu ? 'active' : ''}`}
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile menu content */}
      <div className={`mobile-menu ${showMobileMenu ? 'show' : ''}`}>
        {navMenuItems.map(item => (
          <Link key={item.id} to={item.path} onClick={() => setShowMobileMenu(false)}>{item.title}</Link>
        ))}
        {isAdminAuthenticated && (
          <>
            <Link to="/joynobiadmin" onClick={() => setShowMobileMenu(false)}>Admin Dashboard</Link>
            <button onClick={() => {
              logoutAdmin();
              setShowMobileMenu(false);
            }} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 