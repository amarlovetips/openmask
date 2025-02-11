import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('../../components/AdminLayout'), {
  ssr: false
});
const AdminHome = dynamic(() => import('../../components/AdminHome'), {
  ssr: false
});

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