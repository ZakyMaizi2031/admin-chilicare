import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, BookOpen, FileText, CheckCircle, Shield, Play, HelpCircle } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/logo.jpeg" alt="ChiliCare Logo" className="logo-img" />
            <span className="logo-text">ChiliCare</span>
          </div>
          <div className="nav-links">
            <a href="#about">Tentang</a>
            <a href="#features">Fitur</a>
            <a href="#benefits">Manfaat</a>
          </div>
          <button onClick={() => navigate('/login')} className="btn btn-primary nav-btn">
            Portal Admin
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Shield size={16} />
              <span>Didukung Kecerdasan Buatan (AI)</span>
            </div>
            <h1>Deteksi Dini Penyakit Cabai Merah Lebih Cepat & Akurat</h1>
            <p>
              ChiliCare membantu petani mengidentifikasi penyakit pada buah cabai merah menggunakan teknologi deep learning MobileNetV2 secara real-time. Lindungi panen Anda dan tingkatkan hasil pertanian sekarang.
            </p>
            <div className="hero-actions">
              <a href="#features" className="btn btn-primary btn-large">
                <Play size={18} />
                <span>Pelajari Fitur</span>
              </a>
              <button onClick={() => navigate('/login')} className="btn btn-outline btn-large">
                Masuk sebagai Admin
              </button>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="glow-effect"></div>
            {/* Visual mock scan cabai */}
            <div className="scan-mockup">
              <div className="mock-scanner">
                <div className="scanner-line"></div>
                <img 
                  src="/download.jpg" 
                  alt="Cabai Merah Terinfeksi" 
                  className="mock-img"
                />
                <div className="scan-result-card">
                  <div className="result-header">
                    <span className="result-dot"></span>
                    <span>Terdeteksi: Antraknosa</span>
                  </div>
                  <div className="result-bar">
                    <div className="result-fill" style={{ width: '94.5%' }}></div>
                  </div>
                  <span className="result-accuracy">Akurasi: 94.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Fitur Utama ChiliCare</h2>
          <p>Dirancang khusus untuk memudahkan petani dalam mendeteksi dan merawat tanaman cabai merah</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon bg-success">
              <Scan size={28} />
            </div>
            <h3>Deteksi Kamera AI</h3>
            <p>Cukup ambil foto buah cabai yang bermasalah melalui aplikasi mobile, dan AI kami akan langsung mendeteksi jenis penyakit beserta tingkat akurasinya.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon bg-warning">
              <BookOpen size={28} />
            </div>
            <h3>Ensiklopedia Penyakit</h3>
            <p>Dapatkan penjelasan mendalam mengenai gejala, penyebab, hingga langkah penanganan taktis dan nama obat pertanian untuk menyembuhkan tanaman Anda.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon bg-info">
              <FileText size={28} />
            </div>
            <h3>Artikel Edukasi</h3>
            <p>Baca artikel informatif seputar tips budidaya cabai merah, teknik pencegahan hama, dan tren teknologi pertanian terbaru dari para ahli agronomi.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-image">
            <img 
              src="/petani_cabe.jpg" 
              alt="Petani Cabai Sukses" 
              className="farmers-img"
            />
          </div>
          <div className="benefits-content">
            <h2>Mengapa Harus Menggunakan ChiliCare?</h2>
            <p className="section-intro">Teknologi kami menjembatani keterbatasan akses petani terhadap penyuluh pertanian di lapangan.</p>
            
            <div className="benefits-list">
              <div className="benefit-item">
                <CheckCircle size={20} className="check-icon" />
                <div>
                  <h4>Hemat Waktu & Biaya</h4>
                  <p>Tidak perlu menunggu penyuluh pertanian datang ke kebun. Hasil analisis keluar dalam hitungan detik.</p>
                </div>
              </div>
              <div className="benefit-item">
                <CheckCircle size={20} className="check-icon" />
                <div>
                  <h4>Rekomendasi Penanganan Akurat</h4>
                  <p>Langkah penanganan disesuaikan secara ilmiah berdasarkan jenis penyakit tanaman yang terdeteksi.</p>
                </div>
              </div>
              <div className="benefit-item">
                <CheckCircle size={20} className="check-icon" />
                <div>
                  <h4>Mudah Digunakan</h4>
                  <p>Antarmuka aplikasi yang sederhana dan berbahasa Indonesia, sangat ramah untuk petani di seluruh wilayah Indonesia.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src="/logo.jpeg" alt="ChiliCare Logo" className="logo-img" />
            <span>ChiliCare</span>
          </div>
          <p>© 2026 ChiliCare - Sistem Deteksi Cerdas Penyakit Cabai Merah. Hak Cipta Dilindungi.</p>
        </div>
      </footer>

      <style>{`
        /* Reset and Base Landing Style */
        .landing-wrapper {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #F8FAF9;
          color: #1E293B;
          scroll-behavior: smooth;
        }

        /* Navbar */
        .landing-nav {
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #E2E8F0;
          height: 75px;
          display: flex;
          align-items: center;
        }
        .nav-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .logo-img {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid var(--primary);
        }
        .logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1B5E20;
          letter-spacing: -0.5px;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        .nav-links a {
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.95rem;
          transition: var(--transition);
        }
        .nav-links a:hover {
          color: var(--primary-dark);
        }
        .nav-btn {
          padding: 0.6rem 1.25rem;
          font-size: 0.9rem;
          font-weight: 700;
          border-radius: var(--radius-full);
        }

        /* Hero Section */
        .hero-section {
          padding: 5rem 2rem;
          background: radial-gradient(circle at 10% 20%, rgba(76, 175, 80, 0.04) 0%, rgba(255,255,255,0) 90%);
          overflow: hidden;
        }
        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 968px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
        .hero-badge {
          background-color: var(--primary-light);
          color: var(--primary-dark);
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }
        .hero-content h1 {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.2;
          color: #111827;
          margin-bottom: 1.5rem;
          letter-spacing: -1px;
        }
        .hero-content p {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
        }
        .btn-large {
          padding: 0.9rem 1.75rem;
          font-size: 1rem;
          font-weight: 700;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-outline {
          background: none;
          border: 2px solid var(--primary);
          color: var(--primary);
          cursor: pointer;
          transition: var(--transition);
        }
        .btn-outline:hover {
          background-color: var(--primary-light);
        }

        /* Mockup Scan */
        .hero-image-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .glow-effect {
          position: absolute;
          width: 320px;
          height: 320px;
          background: rgba(76, 175, 80, 0.15);
          filter: blur(80px);
          border-radius: 50%;
          z-index: 1;
        }
        .scan-mockup {
          position: relative;
          z-index: 2;
          border-radius: 24px;
          padding: 12px;
          background: white;
          box-shadow: var(--shadow-lg);
          border: 1px solid #E2E8F0;
        }
        .mock-scanner {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          width: 320px;
          height: 400px;
        }
        .mock-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .scanner-line {
          position: absolute;
          width: 100%;
          height: 3px;
          background: linear-gradient(to right, transparent, #00E676, transparent);
          box-shadow: 0 0 10px #00E676;
          animation: scan-animation 3s linear infinite;
          z-index: 3;
        }
        @keyframes scan-animation {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        .scan-result-card {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          width: 85%;
          padding: 1rem;
          border-radius: 16px;
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(255, 255, 255, 0.3);
          z-index: 4;
        }
        .result-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 0.9rem;
          color: var(--danger);
          margin-bottom: 0.5rem;
        }
        .result-dot {
          width: 8px;
          height: 8px;
          background-color: var(--danger);
          border-radius: 50%;
          display: inline-block;
          animation: blink 1.5s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .result-bar {
          background-color: #E2E8F0;
          height: 6px;
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 0.25rem;
        }
        .result-fill {
          background-color: var(--danger);
          height: 100%;
        }
        .result-accuracy {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        /* Features Section */
        .features-section {
          padding: 6rem 2rem;
          background-color: white;
        }
        .section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 4rem auto;
        }
        .section-header h2 {
          font-size: 2.25rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 1rem;
        }
        .section-header p {
          color: var(--text-muted);
          font-size: 1rem;
        }
        .features-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .feature-card {
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          transition: var(--transition);
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary-light);
        }
        .feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .feature-icon.bg-success {
          background-color: var(--primary-light);
          color: var(--primary-dark);
        }
        .feature-icon.bg-warning {
          background-color: var(--warning-light);
          color: var(--warning);
        }
        .feature-icon.bg-info {
          background-color: #E0E7FF;
          color: #4F46E5;
        }
        .feature-card h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 1rem;
        }
        .feature-card p {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* Benefits Section */
        .benefits-section {
          padding: 6rem 2rem;
          background-color: #F8FAF9;
        }
        .benefits-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 868px) {
          .benefits-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
        .farmers-img {
          width: 100%;
          border-radius: 24px;
          box-shadow: var(--shadow-lg);
        }
        .benefits-content h2 {
          font-size: 2.25rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 1rem;
        }
        .section-intro {
          color: var(--text-muted);
          font-size: 1.05rem;
          margin-bottom: 2rem;
        }
        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .check-icon {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 0.25rem;
        }
        .benefit-item h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.25rem;
        }
        .benefit-item p {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Footer */
        .landing-footer {
          background-color: #111827;
          color: #9CA3AF;
          padding: 3rem 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        @media (max-width: 600px) {
          .footer-container {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          font-weight: 800;
          font-size: 1.25rem;
        }
        .landing-footer p {
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};

export default Landing;
