import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Use dynamic imports to avoid SSR issues
const AdminLayout = dynamic(() => import('../../components/AdminLayout'), {
  ssr: false
});
const AdminHome = dynamic(() => import('../../components/AdminHome'), {
  ssr: false
});

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Add your authentication check here
    const isAuthenticated = localStorage.getItem('adminToken');
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <AdminLayout>
      <AdminHome />
    </AdminLayout>
  );
} 