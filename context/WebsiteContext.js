import React, { createContext, useContext, useState, useEffect } from 'react';
import { config } from '../utils/config';

const WebsiteContext = createContext();

export function WebsiteProvider({ children }) {
  const [websiteSettings, setWebsiteSettings] = useState({
    logo: `${config.websiteUrl}/assets/images/default-logo.png`,
    title: 'OpenMask',
    description: 'NFT Marketplace',
    theme: 'light'
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('websiteSettings');
    if (savedSettings) {
      setWebsiteSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSettings = (newSettings) => {
    const updatedSettings = { ...websiteSettings, ...newSettings };
    setWebsiteSettings(updatedSettings);
    localStorage.setItem('websiteSettings', JSON.stringify(updatedSettings));
  };

  if (!mounted) {
    return null;
  }

  return (
    <WebsiteContext.Provider value={{ websiteSettings, updateSettings }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
} 