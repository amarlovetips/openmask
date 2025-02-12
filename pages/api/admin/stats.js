// Mock stats service
const mockStats = {
  users: 1234,
  nfts: 567,
  transactions: 890,
  revenue: '123.45 ETH'
};

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!req.cookies.adminSession) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return res.status(200).json(mockStats);
  } catch (error) {
    console.error('Stats error:', error);
    return res.status(500).json({ message: 'Error fetching stats' });
  }
} 