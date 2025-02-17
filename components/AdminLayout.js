import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import styles from '@/styles/components/AdminLayout.module.css';

export default function AdminLayout({ children }) {
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
    <div className={styles.adminLayout}>
      <nav className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <Link href="/joynobiadmin" className={styles.navLink}>
            Dashboard
          </Link>
          <Link href="/joynobiadmin/website-settings" className={styles.navLink}>
            Website Settings
          </Link>
          <Link href="/joynobiadmin/menu-settings" className={styles.navLink}>
            Menu Settings
          </Link>
        </div>
      </nav>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
} 