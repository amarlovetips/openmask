export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    if (username === process.env.NEXT_PUBLIC_ADMIN_USERNAME && 
        password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Authentication failed' 
    });
  }
} 