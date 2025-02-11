import { statsService } from '../../../services/StatsService';
import { adminAuthMiddleware } from '../../../middleware/adminAuth';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const stats = statsService.getStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
}

export default adminAuthMiddleware(handler); 