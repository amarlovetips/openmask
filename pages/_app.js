import { useEffect, useState } from 'react';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import { WebsiteProvider } from '../context/WebsiteContext';
import { WalletProvider } from '../context/WalletContext';
import Navbar from '../components/Navbar';

// Import styles
import '../styles/globals.css';
import '../styles/components/index.css';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <AdminAuthProvider>
      <WebsiteProvider>
        <WalletProvider>
          <div className="App">
            <Navbar />
            <Component {...pageProps} />
          </div>
        </WalletProvider>
      </WebsiteProvider>
    </AdminAuthProvider>
  );
}

export default MyApp;