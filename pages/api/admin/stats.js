// Mock stats service
const mockStats = {
  users: 1234,
  nfts: 567,
  transactions: 890,
  revenue: '123.45 ETH'
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check for admin session
    const adminSession = req.cookies.adminSession;
    if (!adminSession) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Return mock stats
    res.status(200).json(mockStats);
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
} 