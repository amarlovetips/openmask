import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState({ native: '0.00', weth: '0.00', usdt: '0.00' });

  // Connect Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setIsLoggedIn(true);

        // Fetch balances (example)
        const nativeBalance = await provider.getBalance(address);
        setBalance({
          native: ethers.formatEther(nativeBalance),
          weth: '0.00', // Replace with actual WETH balance fetch
          usdt: '0.00', // Replace with actual USDT balance fetch
        });
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Error connecting wallet. Please try again.');
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet.');
    }
  };

  // Disconnect Wallet
  const disconnectWallet = () => {
    setWalletAddress('');
    setIsLoggedIn(false);
    setBalance({ native: '0.00', weth: '0.00', usdt: '0.00' });
  };

  // Handle wallet events
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left Section */}
          <div className="flex items-center space-x-8">
            <Link href="/">
              <img src="/logo.png" alt="OpenMask Logo" className="h-8" />
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link href="/collections" className="text-gray-700 hover:text-gray-900">Collections</Link>
              <Link href="/launchpad" className="text-gray-700 hover:text-gray-900">Launchpad</Link>
              <Link href="/more" className="text-gray-700 hover:text-gray-900">More</Link>
            </nav>
          </div>

          {/* Middle Section - Search Bar */}
          <div className="hidden md:block flex-1 mx-8">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Wallet Icon */}
                <div
                  className="relative cursor-pointer"
                  onMouseEnter={() => setShowWalletMenu(true)}
                  onMouseLeave={() => setShowWalletMenu(false)}
                >
                  <img src="/wallet-icon.png" alt="Wallet" className="h-6" />
                  {showWalletMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <div className="p-4">
                        <p className="text-sm">Native Coin: {balance.native} ETH</p>
                        <p className="text-sm">WETH: {balance.weth} WETH</p>
                        <p className="text-sm">USDT: {balance.usdt} USDT</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Menu */}
                <div
                  className="relative cursor-pointer"
                  onMouseEnter={() => setShowProfileMenu(true)}
                  onMouseLeave={() => setShowProfileMenu(false)}
                >
                  <img src="/profile.png" alt="Profile" className="h-8 rounded-full" />
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                      <Link href="/creator-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Creator Dashboard</Link>
                      <button onClick={disconnectWallet} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log Out</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={connectWallet}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </header>
  );
} 