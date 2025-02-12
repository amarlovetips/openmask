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

  // Simple session check
  const session = req.cookies.adminSession;
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.status(200).json(mockStats);
} 