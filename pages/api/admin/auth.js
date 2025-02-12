import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    if (username === process.env.NEXT_PUBLIC_ADMIN_USERNAME && 
        password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      
      // Set simple cookie
      res.setHeader('Set-Cookie', 'adminSession=true; Path=/; HttpOnly; SameSite=Strict');
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Authentication failed' 
    });
  }
} 