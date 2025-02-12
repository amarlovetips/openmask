import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAdminAuth } from '@/context/AdminAuthContext';
import AdminLayout from '../../components/AdminLayout';
import AdminHome from './home';

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/joynobiadmin/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <AdminHome />
    </AdminLayout>
  );
} 