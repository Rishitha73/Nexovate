import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navbarStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    .navbar-wrapper {
      position: sticky;
      top: 12px;
      left: 0;
      right: 0;
      width: calc(100% - 24px);
      margin: 0 auto;
      z-index: 1000;
      background: linear-gradient(180deg, rgba(250, 249, 255, 0.95) 0%, rgba(245, 243, 255, 0.9) 100%);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(139, 92, 246, 0.1);
      border-radius: 18px;
      box-shadow:
        0 0 0 1px rgba(139, 92, 246, 0.06),
        0 0 24px rgba(124, 58, 237, 0.12),
        0 8px 18px rgba(124, 58, 237, 0.08);
    }

    .navbar-container {
      width: 100%;
      margin: 0;
      padding: 0 28px;
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

    .navbar-right {
      display: flex;
      align-items: center;
      gap: 16px;
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

    /* Tablet & Medium Screens (1024px and below) */
    @media (max-width: 1024px) {
      .navbar-container {
        padding: 0 20px;
      }

      .navbar-logo-text {
        font-size: 20px;
      }

      .navbar-logo-icon {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }

      .navbar-button {
        padding: 9px 18px;
        font-size: 12px;
      }
    }

    /* Tablet Screens (768px and below) */
    @media (max-width: 768px) {
      .navbar-container {
        padding: 0 16px;
        height: 60px;
      }

      .navbar-brand {
        gap: 8px;
      }

      .navbar-logo-text {
        font-size: 18px;
      }

      .navbar-logo-icon {
        width: 36px;
        height: 36px;
        font-size: 18px;
      }

      .navbar-right {
        gap: 8px;
      }

      .navbar-button {
        padding: 8px 14px;
        font-size: 11px;
      }
    }

    /* Mobile Screens (640px and below) */
    @media (max-width: 640px) {
      .navbar-container {
        padding: 0 12px;
        height: 56px;
      }

      .navbar-logo-text {
        display: none;
      }

      .navbar-logo-icon {
        width: 32px;
        height: 32px;
        font-size: 16px;
      }

      .navbar-right {
        gap: 6px;
      }

      .navbar-button {
        padding: 7px 12px;
        font-size: 10px;
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

      .navbar-button {
        padding: 6px 10px;
        font-size: 9px;
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

          <div className="navbar-right">
            <Link to="/login" className="navbar-button navbar-button-outline">
              Sign In
            </Link>
            <Link to="/register" className="navbar-button">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
