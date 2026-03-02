import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navbarStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    .navbar-wrapper {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: linear-gradient(180deg, rgba(250, 249, 255, 0.95) 0%, rgba(245, 243, 255, 0.9) 100%);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(139, 92, 246, 0.1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
      background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #6366f1 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: white;
      font-weight: 800;
      font-family: 'Syne', sans-serif;
      box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2);
      transition: all 0.3s ease;
    }

    .navbar-logo-icon:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
    }

    .navbar-logo-text {
      font-size: 22px;
      font-weight: 800;
      color: #1a1a2e;
      font-family: 'Syne', sans-serif;
      letter-spacing: -0.5px;
    }

    .navbar-center {
      display: flex;
      gap: 40px;
      align-items: center;
      flex: 1;
      margin-left: 60px;
    }

    .navbar-link {
      color: #1a1a2e;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      position: relative;
      transition: color 0.3s ease;
      cursor: pointer;
    }

    .navbar-link:hover {
      color: #8b5cf6;
    }

    .navbar-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #8b5cf6, #ec4899);
      transition: width 0.3s ease;
    }

    .navbar-link:hover::after {
      width: 100%;
    }

    .navbar-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .navbar-userinfo {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .navbar-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #8b5cf6, #7c3aed);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 14px;
    }

    .navbar-username {
      font-size: 13px;
      font-weight: 600;
      color: #1a1a2e;
    }

    .navbar-button {
      padding: 10px 22px;
      border-radius: 10px;
      border: none;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'DM Sans', sans-serif;
    }

    .navbar-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
    }

    .navbar-button-outline {
      background: transparent;
      border: 1.5px solid #8b5cf6;
      color: #8b5cf6;
    }

    .navbar-button-outline:hover {
      background: rgba(139, 92, 246, 0.05);
    }

    .hamburger {
      display: none;
      flex-direction: column;
      cursor: pointer;
      gap: 6px;
    }

    .hamburger span {
      width: 24px;
      height: 2.5px;
      background: #1a1a2e;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    @media (max-width: 768px) {
      .navbar-container {
        padding: 0 20px;
      }

      .navbar-center {
        display: none;
      }

      .hamburger {
        display: flex;
      }

      .hamburger.open span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
      }

      .hamburger.open span:nth-child(2) {
        opacity: 0;
      }

      .hamburger.open span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
      }

      .navbar-right {
        gap: 10px;
      }

      .navbar-userinfo {
        display: none;
      }
    }
  `;

  return (
    <>
      <style>{navbarStyles}</style>
      <div className="navbar-wrapper">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <div className="navbar-logo-icon">N</div>
            <div className="navbar-logo-text">Nexovate</div>
          </Link>

          <div className="navbar-center">
            <Link to="/" className="navbar-link">Home</Link>
            {user && (
              <>
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                <Link to="/profile" className="navbar-link">Profile</Link>
              </>
            )}
          </div>

          <div className="navbar-right">
            {user ? (
              <>
                <div className="navbar-userinfo">
                  <div className="navbar-avatar">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="navbar-username">{user.name || 'User'}</div>
                </div>
                <button onClick={handleLogout} className="navbar-button">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-button navbar-button-outline">
                  Sign In
                </Link>
                <Link to="/register" className="navbar-button">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
