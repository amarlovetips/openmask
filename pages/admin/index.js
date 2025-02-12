import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import AdminHome from '../../pages/joynobiadmin/home';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = document.cookie.includes('adminSession=true');
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