import React from 'react';
import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, FileText, LogOut } from 'lucide-react';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('chilicare_token');
  const userJson = localStorage.getItem('chilicare_user');
  const user = userJson ? JSON.parse(userJson) : null;

  // Proteksi Route: Jika tidak ada token atau bukan admin, arahkan ke halaman login
  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('chilicare_token');
    localStorage.removeItem('chilicare_user');
    navigate('/login');
  };

  const initialName = user.nama_lengkap ? user.nama_lengkap.charAt(0).toUpperCase() : 'A';

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/logo.jpeg" alt="Logo" className="sidebar-logo" />
          <h2 className="sidebar-title">ChiliCare</h2>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/users" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Users size={20} />
            <span>Petani</span>
          </NavLink>
          <NavLink to="/encyclopedia" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <BookOpen size={20} />
            <span>Penyakit</span>
          </NavLink>
          <NavLink to="/artikel" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <FileText size={20} />
            <span>Artikel</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <h1 className="topbar-title">Admin Dashboard</h1>
          <div className="topbar-profile">
            <div className="profile-avatar">{initialName}</div>
            <span>{user.nama_lengkap}</span>
            <button onClick={handleLogout} className="btn-logout" title="Keluar dari Sistem">
              <LogOut size={18} />
            </button>
          </div>
        </header>


        <div className="content-area animate-fade-in">
          <Outlet />
        </div>
      </main>

      {/* Inline styles for components not in global.css to keep it organized */}
      <style>{`
        .sidebar {
          width: 260px;
          background-color: var(--sidebar-bg);
          color: var(--sidebar-text);
          display: flex;
          flex-direction: column;
        }
        .sidebar-header {
          height: 70px;
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          gap: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .sidebar-logo {
          width: 32px;
          height: 32px;
          border-radius: 8px;
        }
        .sidebar-title {
          color: white;
          font-size: 1.25rem;
          font-weight: 800;
        }
        .sidebar-nav {
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 500;
          transition: var(--transition);
        }
        .nav-item:hover {
          background-color: rgba(255,255,255,0.05);
          color: white;
        }
        .nav-item.active {
          background-color: var(--sidebar-active-bg);
          color: var(--sidebar-active-text);
        }
        .topbar-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 600;
        }
        .profile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-logout {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 50%;
          transition: var(--transition);
        }
        .btn-logout:hover {
          background-color: var(--surface-hover);
          color: var(--danger);
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
