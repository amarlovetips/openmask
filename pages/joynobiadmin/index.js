import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import AdminHome from './home';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminToken');
    if (!isAuthenticated) {
      router.push('/joynobiadmin/login');
    }
  }, [router]);

  return (
    <AdminLayout>
      <AdminHome />
    </AdminLayout>
  );
} 