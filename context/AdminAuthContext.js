import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check cookie on mount
    setIsAuthenticated(document.cookie.includes('adminSession=true'));
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    // Clear cookie
    document.cookie = 'adminSession=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsAuthenticated(false);
    router.push('/joynobiadmin/login');
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
} 