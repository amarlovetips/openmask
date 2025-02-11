import { ethers } from 'ethers';

class StatsService {
  constructor() {
    this.stats = {
      totalUsers: 0,
      totalCollections: 0,
      totalItems: 0,
      totalTransactions: 0,
      totalVolume: 0,
      weeklyActiveUsers: 0,
      weeklyNewCollections: 0,
      weeklyTransactions: 0,
      weeklyVolume: 0,
      dailyActiveUsers: 0,
      dailyNewCollections: 0,
      dailyTransactions: 0,
      dailyVolume: 0,
      onlineUsers: 0,
      todayNewUsers: 0
    };

    // Load saved stats from localStorage
    this.loadStats();
    
    // Start tracking online users
    this.trackOnlineUsers();
    
    // Initialize blockchain listener
    this.initBlockchainListener();
  }

  loadStats() {
    const savedStats = localStorage.getItem('adminStats');
    if (savedStats) {
      this.stats = JSON.parse(savedStats);
    }
  }

  saveStats() {
    localStorage.setItem('adminStats', JSON.stringify(this.stats));
  }

  async initBlockchainListener() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Listen for new blocks
      provider.on('block', async (blockNumber) => {
        const block = await provider.getBlock(blockNumber, true);
        if (block && block.transactions) {
          this.processNewTransactions(block.transactions);
        }
      });
    }
  }

  processNewTransactions(transactions) {
    transactions.forEach(tx => {
      if (this.isNFTTransaction(tx)) {
        this.stats.totalTransactions++;
        this.stats.dailyTransactions++;
        
        const volume = parseFloat(ethers.formatEther(tx.value));
        this.stats.totalVolume += volume;
        this.stats.dailyVolume += volume;
        
        this.saveStats();
      }
    });
  }

  isNFTTransaction(tx) {
    // Add your NFT contract addresses here
    const nftContracts = [
      '0xYourNFTContractAddress1',
      '0xYourNFTContractAddress2'
    ];
    return nftContracts.includes(tx.to?.toLowerCase());
  }

  trackOnlineUsers() {
    // Simulate online users with random fluctuations
    setInterval(() => {
      const baseUsers = 50; // Base number of users
      const variation = Math.floor(Math.random() * 20) - 10; // Random variation between -10 and +10
      this.stats.onlineUsers = Math.max(0, baseUsers + variation);
      this.saveStats();
    }, 30000); // Update every 30 seconds
  }

  // Methods to update stats
  addNewUser() {
    this.stats.totalUsers++;
    this.stats.todayNewUsers++;
    this.saveStats();
  }

  addNewCollection() {
    this.stats.totalCollections++;
    this.stats.dailyNewCollections++;
    this.stats.weeklyNewCollections++;
    this.saveStats();
  }

  addNewItem() {
    this.stats.totalItems++;
    this.saveStats();
  }

  // Method to get all stats
  getStats() {
    return { ...this.stats };
  }

  // Reset daily stats at midnight
  resetDailyStats() {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      this.stats.dailyActiveUsers = 0;
      this.stats.dailyNewCollections = 0;
      this.stats.dailyTransactions = 0;
      this.stats.dailyVolume = 0;
      this.stats.todayNewUsers = 0;
      this.saveStats();
    }
  }

  // Reset weekly stats on Sunday midnight
  resetWeeklyStats() {
    const now = new Date();
    if (now.getDay() === 0 && now.getHours() === 0 && now.getMinutes() === 0) {
      this.stats.weeklyActiveUsers = 0;
      this.stats.weeklyNewCollections = 0;
      this.stats.weeklyTransactions = 0;
      this.stats.weeklyVolume = 0;
      this.saveStats();
    }
  }
}

export const statsService = new StatsService(); 