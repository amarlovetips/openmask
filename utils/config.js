export const config = {
  websiteUrl: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000'
    : 'https://your-actual-vercel-url.vercel.app',
  isDev: process.env.NODE_ENV === 'development'
}; 