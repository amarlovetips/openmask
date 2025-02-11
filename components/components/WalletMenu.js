import { useState, useEffect } from 'react';
import { FaEthereum, FaSignOutAlt } from 'react-icons/fa';
import { ethers } from 'ethers';
import './WalletMenu.css';

// WETH ABI - only including balanceOf function
const WETH_ABI = [
  {
    "constant": true,
    "inputs": [{"name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
  }
];

// WETH addresses for different networks
const WETH_ADDRESSES = {
  '1': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // Mainnet
  '5': '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', // Goerli
  '11155111': '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14' // Sepolia
};

// Supported networks configuration
const SUPPORTED_NETWORKS = {
  '1': {
    chainId: '0x1',
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.infura.io/v3/your-project-id',
    blockExplorer: 'https://etherscan.io'
  },
  '11155111': {
    chainId: '0xaa36a7',
    name: 'Sepolia Testnet',
    symbol: 'ETH',
    rpcUrl: 'https://sepolia.infura.io/v3/your-project-id',
    blockExplorer: 'https://sepolia.etherscan.io',
    isTestnet: true
  }
};

function WalletMenu({ 
  account, 
  disconnectWallet, 
  isOpen, 
  onClose 
}) {
  const [balances, setBalances] = useState({
    native: '0.00',
    weth: '0.00',
    nativeUSD: '0.00',
    wethUSD: '0.00'
  });
  const [chainId, setChainId] = useState('');
  const [chainName, setChainName] = useState('');
  const [isSupported, setIsSupported] = useState(true);

  const [menuItems] = useState(() => {
    const savedItems = localStorage.getItem('walletMenuItems');
    return savedItems ? JSON.parse(savedItems).filter(item => item.isActive) : [
      { id: 1, title: 'My NFTs', path: '/my-nfts', icon: '🖼️', isActive: true },
      { id: 2, title: 'Transactions', path: '/transactions', icon: '📝', isActive: true },
      { id: 3, title: 'Settings', path: '/wallet-settings', icon: '⚙️', isActive: true },
    ];
  });

  const switchNetwork = async (targetChainId) => {
    if (!window.ethereum) return;
    
    const network = SUPPORTED_NETWORKS[targetChainId];

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: network.chainId,
                chainName: network.name,
                nativeCurrency: {
                  name: network.symbol,
                  symbol: network.symbol,
                  decimals: 18
                },
                rpcUrls: [network.rpcUrl],
                blockExplorerUrls: [network.blockExplorer]
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding network:', addError);
        }
      }
      console.error('Error switching network:', switchError);
    }
  };

  // Fetch balances and chain info
  useEffect(() => {
    const fetchBalances = async () => {
      if (account && window.ethereum) {
        try {
          // Get provider
          const provider = new ethers.BrowserProvider(window.ethereum);
          
          // Get native balance
          const balance = await provider.getBalance(account);
          const formattedBalance = ethers.formatEther(balance);
          
          // Get network info
          const network = await provider.getNetwork();
          const chainId = network.chainId.toString();
          let currentChainName = 'Unknown Network';

          // Map chain IDs to names
          const chainNames = {
            '1': 'ETH',
            '5': 'ETH',
            '11155111': 'ETH',
            '137': 'MATIC',
            '80001': 'MATIC',
          };

          if (chainNames[chainId]) {
            currentChainName = chainNames[chainId];
          }

          setChainId(chainId);
          setChainName(currentChainName);

          // Get WETH balance if on Ethereum networks
          let wethBalance = '0.00';
          if (WETH_ADDRESSES[chainId]) {
            try {
              const wethContract = new ethers.Contract(
                WETH_ADDRESSES[chainId],
                WETH_ABI,
                provider
              );
              const wethBal = await wethContract.balanceOf(account);
              wethBalance = ethers.formatEther(wethBal);
            } catch (error) {
              console.error('Error fetching WETH balance:', error);
            }
          }

          // Update balances
          setBalances(prev => ({
            ...prev,
            native: Number(formattedBalance).toFixed(4),
            weth: Number(wethBalance).toFixed(4),
            nativeUSD: '0.00', // TODO: Add price feed
            wethUSD: '0.00' // TODO: Add price feed
          }));

        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalances();
    
    // Listen for chain changes
    if (window.ethereum) {
      window.ethereum.on('chainChanged', fetchBalances);
      window.ethereum.on('accountsChanged', fetchBalances);
      return () => {
        window.ethereum.removeListener('chainChanged', fetchBalances);
        window.ethereum.removeListener('accountsChanged', fetchBalances);
      };
    }
  }, [account]);

  // Update useEffect to check network support
  useEffect(() => {
    const checkNetwork = async () => {
      if (account && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const network = await provider.getNetwork();
          const chainId = network.chainId.toString();
          setIsSupported(!!SUPPORTED_NETWORKS[chainId]);
        } catch (error) {
          console.error('Error checking network:', error);
        }
      }
    };

    checkNetwork();
  }, [account, chainId]);

  if (!isOpen) return null;

  return (
    <div className="wallet-menu">
      <div className="wallet-menu-header">
        <div className="chain-selector">
          <div className="current-chain">
            <span className={`chain-dot ${isSupported ? 'supported' : 'unsupported'}`}></span>
            <span className="chain-name">{chainName}</span>
            <span className="chain-switch-icon">▼</span>
          </div>
          <div className="supported-chains">
            {Object.entries(SUPPORTED_NETWORKS).map(([id, network]) => (
              <button
                key={id}
                onClick={() => switchNetwork(id)}
                className={`chain-option ${chainId === id ? 'active' : ''}`}
              >
                <span className="chain-option-dot"></span>
                <span className="chain-option-name">{network.name}</span>
                {chainId === id && <span className="chain-option-check">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {!isSupported && (
          <div className="network-warning">
            <p>Unsupported network. Please switch to a supported network.</p>
          </div>
        )}
        
        {isSupported && (
          <div className="balance-section">
            <div className="balance-item">
              <div className="balance-icon">
                <FaEthereum />
              </div>
              <div className="balance-info">
                <span className="balance-amount">{balances.native} {chainName}</span>
                <span className="balance-usd">${balances.nativeUSD} USD</span>
              </div>
            </div>
            {/* Only show WETH on Ethereum networks */}
            {WETH_ADDRESSES[chainId] && Number(balances.weth) > 0 && (
              <div className="balance-item">
                <div className="balance-icon weth">WETH</div>
                <div className="balance-info">
                  <span className="balance-amount">{balances.weth} WETH</span>
                  <span className="balance-usd">${balances.wethUSD} USD</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isSupported ? (
        <>
          <div className="wallet-menu-body">
            {menuItems.map(item => (
              <a key={item.id} href={item.path} className="wallet-menu-item">
                <span className="menu-item-icon">{item.icon}</span>
                <span className="menu-item-title">{item.title}</span>
              </a>
            ))}
          </div>
          <div className="wallet-menu-footer">
            <button onClick={disconnectWallet} className="disconnect-button">
              <FaSignOutAlt />
              <span>Disconnect Wallet</span>
            </button>
          </div>
        </>
      ) : (
        <div className="wallet-menu-footer">
          <button onClick={disconnectWallet} className="disconnect-button">
            <FaSignOutAlt />
            <span>Disconnect Wallet</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletMenu; 