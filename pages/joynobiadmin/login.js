import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAdminAuth } from '../../context/AdminAuthContext';
import styles from '../../styles/components/AdminLogin.module.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setIsAuthenticated } = useAdminAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simple local authentication
      if (username === process.env.NEXT_PUBLIC_ADMIN_USERNAME && 
          password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        localStorage.setItem('adminToken', 'authenticated');
        setIsAuthenticated(true);
        router.push('/joynobiadmin');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.adminLogin}>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>Admin Login</h1>
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.formInput}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              required
              disabled={isLoading}
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
} 