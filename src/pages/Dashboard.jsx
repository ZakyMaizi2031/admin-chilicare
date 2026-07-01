import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { 
  Users, 
  AlertTriangle, 
  Scan, 
  Activity, 
  ChevronRight, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Globe, 
  BookOpen, 
  FileText 
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_users: 0,
    total_diseases: 0,
    total_scans: 0
  });
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // 1. Ambil Data Statistik
        const statsRes = await api.get('/api/admin/stats');
        setStats(statsRes.data);

        // 2. Ambil Data Riwayat Scan
        const historyRes = await api.get('/api/admin/history-monitor');
        // Urutkan berdasarkan id_riwayat atau tanggal descending (terbaru di atas)
        const sortedScans = (historyRes.data || []).sort((a, b) => b.id_riwayat - a.id_riwayat);
        setRecentScans(sortedScans.slice(0, 5)); // Ambil 5 data terbaru saja
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Format tanggal ke format Indonesia
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Mendapatkan warna badge untuk jenis penyakit
  const getDiseaseBadgeClass = (diseaseName) => {
    if (!diseaseName) return 'badge-secondary';
    const name = diseaseName.toLowerCase();
    if (name.includes('sehat')) return 'badge-healthy';
    if (name.includes('antraknosa')) return 'badge-danger';
    if (name.includes('busuk')) return 'badge-warning';
    return 'badge-info'; // Untuk Alternaria dll
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <span>Memuat data dashboard...</span>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <h2>Selamat Datang Kembali, Admin! 👋</h2>
          <p>Sistem ChiliCare berjalan normal. Pantau deteksi penyakit tanaman cabai dan kelola data di sini.</p>
        </div>
        <div className="welcome-badge">
          <ShieldCheck size={20} />
          <span>Mode Administrator</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card card-petani">
          <div className="icon-wrapper">
            <Users size={24} />
          </div>
          <div className="stat-details">
            <p className="stat-label">Total Petani</p>
            <h3>{stats.total_users}</h3>
          </div>
        </div>

        <div className="stat-card card-penyakit">
          <div className="icon-wrapper">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-details">
            <p className="stat-label">Jenis Penyakit</p>
            <h3>{stats.total_diseases}</h3>
          </div>
        </div>

        <div className="stat-card card-scans">
          <div className="icon-wrapper">
            <Scan size={24} />
          </div>
          <div className="stat-details">
            <p className="stat-label">Total Scan Cabai</p>
            <h3>{stats.total_scans}</h3>
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="dashboard-grid">
        {/* Left Side: Recent Activity */}
        <div className="card grid-main">
          <div className="card-header">
            <div className="header-title">
              <Activity size={20} className="text-primary" />
              <h4>Riwayat Scan Terbaru</h4>
            </div>
          </div>
          
          <div className="scans-list">
            {recentScans.length > 0 ? (
              recentScans.map((scan) => (
                <div key={scan.id_riwayat} className="scan-item">
                  <div className="scan-img-wrapper">
                    <img 
                      src={`${API_BASE_URL}/${scan.file_foto_input}`} 
                      alt={scan.hasil_prediksi}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Cabai'; }}
                      className="scan-thumb"
                    />
                  </div>
                  <div className="scan-info">
                    <h5>ID Scan #{scan.id_riwayat}</h5>
                    <p className="scan-date">{formatDate(scan.tanggal_deteksi)}</p>
                  </div>
                  <div className="scan-status">
                    <span className={`badge ${getDiseaseBadgeClass(scan.hasil_prediksi)}`}>
                      {scan.hasil_prediksi}
                    </span>
                    <span className="scan-accuracy">{scan.tingkat_akurasi}% Akurasi</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>Belum ada aktivitas scan cabai dari petani.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: System Status & Quick Actions */}
        <div className="grid-sidebar">
          {/* System Status Card */}
          <div className="card sidebar-card">
            <div className="card-header">
              <h4>Status Layanan Cloud</h4>
            </div>
            <div className="status-list">
              <div className="status-item">
                <div className="status-label">
                  <Globe size={16} />
                  <span>API Backend (Render)</span>
                </div>
                <span className="status-indicator active">Online</span>
              </div>
              <div className="status-item">
                <div className="status-label">
                  <Database size={16} />
                  <span>Database (Aiven MySQL)</span>
                </div>
                <span className="status-indicator active">Terhubung</span>
              </div>
              <div className="status-item">
                <div className="status-label">
                  <Cpu size={16} />
                  <span>Model AI MobileNetV2</span>
                </div>
                <span className="status-indicator active">Aktif</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="card sidebar-card">
            <div className="card-header">
              <h4>Aksi Cepat Admin</h4>
            </div>
            <div className="actions-list">
              <button onClick={() => navigate('/encyclopedia')} className="action-btn">
                <div className="action-icon warning">
                  <BookOpen size={18} />
                </div>
                <span>Kelola Katalog Penyakit</span>
                <ChevronRight size={16} className="arrow-icon" />
              </button>
              <button onClick={() => navigate('/artikel')} className="action-btn">
                <div className="action-icon primary">
                  <FileText size={18} />
                </div>
                <span>Kelola & Tulis Artikel</span>
                <ChevronRight size={16} className="arrow-icon" />
              </button>
              <button onClick={() => navigate('/users')} className="action-btn">
                <div className="action-icon info">
                  <Users size={18} />
                </div>
                <span>Lihat Data Petani</span>
                <ChevronRight size={16} className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-bottom: 2rem;
        }

        /* Welcome Banner */
        .welcome-banner {
          background: linear-gradient(135deg, var(--primary-dark) 0%, #1B5E20 100%);
          border-radius: var(--radius-lg);
          padding: 2rem;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: var(--shadow-glow);
          position: relative;
          overflow: hidden;
        }
        .welcome-banner::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(255,255,255,0.03);
          border-radius: 50%;
          right: -100px;
          top: -100px;
        }
        .welcome-text h2 {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: white;
        }
        .welcome-text p {
          opacity: 0.9;
          font-size: 0.95rem;
          max-width: 600px;
        }
        .welcome-badge {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(5px);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 0.85rem;
          border: 1px solid rgba(255,255,255,0.25);
        }

        /* Stats Cards */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-petani .icon-wrapper {
          background-color: var(--primary-light);
          color: var(--primary-dark);
        }
        .card-penyakit .icon-wrapper {
          background-color: var(--warning-light);
          color: var(--warning);
        }
        .card-scans .icon-wrapper {
          background-color: #E0E7FF;
          color: #4F46E5;
        }
        .stat-details .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }
        .stat-details h3 {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--text-main);
          line-height: 1;
        }

        /* Middle Grid Layout */
        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }
        .card-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-header h4 {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-main);
        }
        .header-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Recent Activity List */
        .scans-list {
          padding: 1rem 1.5rem;
          display: flex;
          flex-direction: column;
        }
        .scan-item {
          display: flex;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border);
          transition: var(--transition);
        }
        .scan-item:last-child {
          border-bottom: none;
        }
        .scan-img-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          overflow: hidden;
          background: var(--surface-hover);
          border: 1px solid var(--border);
        }
        .scan-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .scan-info {
          flex: 1;
          margin-left: 1.25rem;
        }
        .scan-info h5 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.15rem;
        }
        .scan-date {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .scan-status {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
        }
        .scan-accuracy {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .empty-state {
          padding: 3rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        /* System Status Dashboard */
        .status-list {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .status-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .status-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-main);
          font-weight: 600;
        }
        .status-indicator {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .status-indicator.active {
          background-color: var(--primary-light);
          color: var(--primary-dark);
        }
        .status-indicator.active::before {
          content: '';
          width: 6px;
          height: 6px;
          background-color: var(--primary);
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px var(--primary);
        }

        /* Quick Actions Menu */
        .actions-list {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .action-btn {
          background: none;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          width: 100%;
          cursor: pointer;
          transition: var(--transition);
        }
        .action-btn:hover {
          background-color: var(--surface-hover);
          transform: translateX(4px);
        }
        .action-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
        }
        .action-icon.primary {
          background-color: var(--primary-light);
          color: var(--primary-dark);
        }
        .action-icon.warning {
          background-color: var(--warning-light);
          color: var(--warning);
        }
        .action-icon.info {
          background-color: #E0E7FF;
          color: #4F46E5;
        }
        .action-btn span {
          flex: 1;
          text-align: left;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-main);
        }
        .arrow-icon {
          color: var(--text-muted);
        }

        /* Loading Spinner */
        .dashboard-loading {
          min-height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Badges */
        .badge {
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }
        .badge-healthy {
          background-color: var(--primary-light);
          color: var(--primary-dark);
        }
        .badge-danger {
          background-color: var(--danger-light);
          color: var(--danger);
        }
        .badge-warning {
          background-color: var(--warning-light);
          color: var(--warning);
        }
        .badge-info {
          background-color: #E0E7FF;
          color: #4F46E5;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
