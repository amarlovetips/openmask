import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AdminLayout from '../../components/AdminLayout';
import { FaWallet, FaKey, FaChartLine, FaBook } from 'react-icons/fa';

export default function Dashboard() {
  const [walletInfo, setWalletInfo] = useState({
    address: process.env.NEXT_PUBLIC_ADMIN_WALLET,
    balance: '0',
    networkName: ''
  });

  const [apiKeys, setApiKeys] = useState({
    infuraKey: process.env.NEXT_PUBLIC_INFURA_ID,
    etherscanKey: process.env.ETHERSCAN_API_KEY,
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
    networkName: process.env.NEXT_PUBLIC_NETWORK_NAME
  });

  const [income, setIncome] = useState({
    total: '0',
    today: '0',
    thisMonth: '0'
  });

  useEffect(() => {
    const fetchWalletInfo = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        try {
          const network = await provider.getNetwork();
          const balance = await provider.getBalance(walletInfo.address);
          
          setWalletInfo(prev => ({
            ...prev,
            balance: ethers.formatEther(balance),
            networkName: network.name
          }));
        } catch (error) {
          console.error('Error fetching wallet info:', error);
        }
      }
    };

    fetchWalletInfo();
  }, [walletInfo.address]);

  return (
    <AdminLayout>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>

        {/* Wallet Section */}
        <section className="dashboard-section">
          <h2 className="section-title">
            <FaWallet className="section-icon" /> Admin Wallet
          </h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Wallet Address</h3>
              <p>{walletInfo.address}</p>
              <button onClick={() => navigator.clipboard.writeText(walletInfo.address)} className="copy-button">
                Copy Address
              </button>
            </div>
            <div className="info-card">
              <h3>Balance</h3>
              <p>{walletInfo.balance} ETH</p>
              <p className="subtitle">Network: {walletInfo.networkName}</p>
            </div>
          </div>
        </section>

        {/* API Keys Section */}
        <section className="dashboard-section">
          <h2 className="section-title">
            <FaKey className="section-icon" /> API Keys & Configuration
          </h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Infura API Key</h3>
              <p className="api-key">{apiKeys.infuraKey}</p>
              <button onClick={() => navigator.clipboard.writeText(apiKeys.infuraKey)} className="copy-button">
                Copy Key
              </button>
            </div>
            <div className="info-card">
              <h3>Network Configuration</h3>
              <p>Chain ID: {apiKeys.chainId}</p>
              <p>Network: {apiKeys.networkName}</p>
            </div>
          </div>
        </section>

        {/* Income Section */}
        <section className="dashboard-section">
          <h2 className="section-title">
            <FaChartLine className="section-icon" /> Admin Income
          </h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Total Income</h3>
              <p>{income.total} ETH</p>
            </div>
            <div className="info-card">
              <h3>Today's Income</h3>
              <p>{income.today} ETH</p>
            </div>
            <div className="info-card">
              <h3>This Month</h3>
              <p>{income.thisMonth} ETH</p>
            </div>
          </div>
        </section>

        {/* Quick Tutorial */}
        <section className="dashboard-section">
          <h2 className="section-title">
            <FaBook className="section-icon" /> Quick Tutorial
          </h2>
          <div className="tutorial-steps">
            <div className="step">
              <h3>1. Wallet Setup</h3>
              <p>Your admin wallet is configured to receive platform fees and manage NFT contracts.</p>
              <ul>
                <li>Keep your private key secure</li>
                <li>Monitor wallet balance regularly</li>
                <li>Use only for admin transactions</li>
              </ul>
            </div>
            <div className="step">
              <h3>2. API Configuration</h3>
              <p>The platform uses several APIs for blockchain interaction:</p>
              <ul>
                <li>Infura: For Ethereum network interaction</li>
                <li>Etherscan: For transaction verification</li>
                <li>IPFS: For NFT metadata storage</li>
              </ul>
            </div>
            <div className="step">
              <h3>3. Income Tracking</h3>
              <p>Platform fees are automatically collected from:</p>
              <ul>
                <li>NFT minting fees</li>
                <li>Transaction fees</li>
                <li>Marketplace fees</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
} 