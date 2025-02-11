import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Create from './pages/Create';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import WebsiteSettings from './pages/WebsiteSettings';
import AdminHome from './pages/AdminHome';
import AdminLayout from './components/AdminLayout';
import { WebsiteProvider } from './context/WebsiteContext';
import MenuSettings from './pages/MenuSettings';
import WalletMenuSettings from './pages/WalletMenuSettings';
import './App.css';

function App() {
  return (
    <AdminAuthProvider>
      <WebsiteProvider>
        <WalletProvider>
          <Router>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/create" element={<Create />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/joynobiadmin/login" element={<AdminLogin />} />
                
                {/* Admin routes with layout */}
                <Route path="/joynobiadmin" element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <AdminHome />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                } />
                <Route path="/joynobiadmin/dashboard" element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <AdminDashboard section="dashboard" />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                } />
                <Route path="/joynobiadmin/website-settings" element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <WebsiteSettings />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                } />
                <Route path="/joynobiadmin/users" element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <AdminDashboard section="users" />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                } />
                <Route path="/joynobiadmin/nfts" element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <AdminDashboard section="nfts" />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                } />
                <Route path="/joynobiadmin/menu-settings" element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <MenuSettings />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                } />
                <Route path="/joynobiadmin/wallet-menu-settings" element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <WalletMenuSettings />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                } />
              </Routes>
            </div>
          </Router>
        </WalletProvider>
      </WebsiteProvider>
    </AdminAuthProvider>
  );
}

export default App; 