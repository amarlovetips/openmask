import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAdminAuth } from '../context/AdminAuthContext';
import styles from '../styles/components/AdminLogin.module.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAdmin } = useAdminAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginAdmin(username, password)) {
      router.push('/joynobiadmin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h1>Admin Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin; 