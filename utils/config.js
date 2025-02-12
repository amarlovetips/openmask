export const config = {
  websiteUrl: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000'
    : 'https://openmask.vercel.app',
  isDev: process.env.NODE_ENV === 'development'
}; 