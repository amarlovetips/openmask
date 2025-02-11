import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

function ProtectedAdminRoute({ children }) {
  const { isAdminAuthenticated } = useAdminAuth();

  if (!isAdminAuthenticated) {
    return <Navigate to="/joynobiadmin/login" />;
  }

  return children;
}

export default ProtectedAdminRoute; 