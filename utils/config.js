export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://openmask.vercel.app/api',
  websiteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL || 'openmask.vercel.app',
  isDev: process.env.NODE_ENV === 'development'
}; 