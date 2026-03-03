import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const DashboardNavbar = () => {
  const { user } = useAuth();

  const navbarStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    .navbar-wrapper {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: linear-gradient(180deg, #FFFBF1 0%, #fff 100%);
      backdrop-filter: blur(20px);
      border-bottom: 1.5px solid #ede9fe;
      box-shadow: 0 2px 8px rgba(139, 92, 246, 0.08);
      border-radius: 0 0 30px 30px;
    }

    .navbar-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      cursor: pointer;
    }

    .navbar-logo-icon {
      width: 45px;
      height: 45px;
      border-radius: 12px;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: white;
      font-weight: 800;
      font-family: 'Syne', sans-serif;
      box-shadow: 0 4px 15px rgba(139, 92, 246, 0.15);
      transition: all 0.3s ease;
    }

    .navbar-logo-icon:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(139, 92, 246, 0.25);
    }

    .navbar-logo-text {
      font-size: 22px;
      font-weight: 800;
      color: #1a1a2e;
      font-family: 'Syne', sans-serif;
      letter-spacing: -0.5px;
    }

    .navbar-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .navbar-userinfo {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 10px;
      transition: background 0.3s ease;
    }

    .navbar-userinfo:hover {
      background: rgba(139, 92, 246, 0.08);
    }

    .navbar-avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 18px;
      box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2);
      transition: box-shadow 0.3s ease;
    }

    .navbar-avatar:hover {
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
    }

    .navbar-avatar-text {
      font-size: 14px;
      font-weight: 500;
      font-family: 'DM Sans', sans-serif;
    }

    .navbar-avatar-name {
      color: #1a1a2e;
      font-weight: 600;
    }

    .navbar-avatar-email {
      color: #9ca3af;
      font-size: 12px;
    }

    /* Tablet & Medium Screens (1024px and below) */
    @media (max-width: 1024px) {
      .navbar-container {
        padding: 0 25px;
      }

      .navbar-logo-text {
        font-size: 20px;
      }

      .navbar-logo-icon {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }
    }

    /* Tablet Screens (768px and below) */
    @media (max-width: 768px) {
      .navbar-container {
        padding: 0 16px;
        height: 60px;
      }

      .navbar-logo-text {
        font-size: 18px;
      }

      .navbar-logo-icon {
        width: 36px;
        height: 36px;
        font-size: 18px;
      }

      .navbar-avatar {
        width: 40px;
        height: 40px;
        font-size: 16px;
      }

      .navbar-avatar-text {
        display: none;
      }
    }

    /* Mobile Screens (640px and below) */
    @media (max-width: 640px) {
      .navbar-container {
        padding: 0 12px;
        height: 56px;
      }

      .navbar-logo-icon {
        width: 32px;
        height: 32px;
        font-size: 16px;
      }

      .navbar-logo-text {
        font-size: 16px;
      }

      .navbar-avatar {
        width: 36px;
        height: 36px;
        font-size: 14px;
      }
    }

    /* Very Small Phones (480px and below) */
    @media (max-width: 480px) {
      .navbar-container {
        padding: 0 10px;
        height: 52px;
      }

      .navbar-logo-icon {
        width: 28px;
        height: 28px;
        font-size: 14px;
      }

      .navbar-logo-text {
        font-size: 14px;
      }

      .navbar-avatar {
        width: 32px;
        height: 32px;
        font-size: 12px;
      }

      .navbar-right {
        gap: 10px;
      }
    }
  `;

  return (
    <>
      <style>{navbarStyles}</style>
      <div className="navbar-wrapper">
        <div className="navbar-container">
          <Link to="/dashboard" className="navbar-brand">
            <div className="navbar-logo-icon">N</div>
            <div className="navbar-logo-text">Nexovate</div>
          </Link>

          <div className="navbar-right">
            <Link to="/profile" className="navbar-userinfo" title="View profile">
              <div className="navbar-avatar">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="navbar-avatar-text">
                <div className="navbar-avatar-name">{user?.name || 'User'}</div>
                <div className="navbar-avatar-email">{user?.email || 'user@example.com'}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
