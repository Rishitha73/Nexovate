import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 10.5L12 3l9 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.25 9.75V20a1 1 0 001 1h11.5a1 1 0 001-1V9.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 4v16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <rect x="7" y="12" width="2.8" height="5" rx="1" fill="currentColor" />
    <rect x="11.6" y="9" width="2.8" height="8" rx="1" fill="currentColor" opacity="0.85" />
    <rect x="16.2" y="6" width="2.8" height="11" rx="1" fill="currentColor" opacity="0.7" />
  </svg>
);

const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6.75 10a5.25 5.25 0 1110.5 0v3.2c0 .8.31 1.58.87 2.14l.85.86H5.03l.85-.86A3 3 0 006.75 13.2V10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M10 18a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7.8v4.7l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBox = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 7.8L12 4l8 3.8-8 3.8L4 7.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M4 7.8V16l8 4 8-4V7.8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M12 11.6V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 19a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M10 4H6a2 2 0 00-2 2v12a2 2 0 002 2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconMoon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20.5 14.2A8.5 8.5 0 1110 3.5a7 7 0 0010.5 10.7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSun = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.7 5.3l-1.7 1.7M7 17l-1.7 1.7M18.7 18.7L17 17M7 7l-1.7-1.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    const width = isOpen ? '272px' : '88px';
    document.documentElement.style.setProperty('--sidebar-width', width);
    return () => {
      document.documentElement.style.removeProperty('--sidebar-width');
    };
  }, [isOpen]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <IconHome /> },
    { name: 'Revenue', icon: <IconChart /> },
    { name: 'Notifications', icon: <IconBell /> },
    { name: 'Analytics', icon: <IconClock /> },
    { name: 'Inventory', icon: <IconBox /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const isActive = (path) => location.pathname === path;

  const sidebarStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    .sidebar-wrapper {
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      width: ${isOpen ? '272px' : '88px'};
      background: var(--sidebar-bg);
      border-right: 1.5px solid var(--sidebar-border);
      overflow-y: auto;
      overflow-x: hidden;
      transition: width 0.28s ease;
      z-index: 999;
      border-radius: 0 0 18px 0;
    }

    .sidebar-content {
      padding: 14px 10px;
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 8px;
      background: var(--sidebar-panel-bg);
      border-radius: 14px;
      border: 1px solid var(--sidebar-panel-border);
    }

    .sidebar-menu {
      flex: 1;
      padding: 6px;
    }

    .brand-head {
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid var(--sidebar-panel-border);
      padding: 10px 12px;
    }

    .brand-logo {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: var(--sidebar-accent);
      color: var(--sidebar-panel-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      font-family: 'Syne', sans-serif;
      flex-shrink: 0;
    }

    .brand-name {
      font-size: 15px;
      color: var(--sidebar-heading);
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      line-height: 1.2;
      opacity: ${isOpen ? '1' : '0'};
      width: ${isOpen ? 'auto' : '0'};
      overflow: hidden;
      white-space: nowrap;
    }

    .brand-tagline {
      font-size: 12px;
      color: var(--sidebar-muted);
      font-family: 'DM Sans', sans-serif;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
      opacity: ${isOpen ? '1' : '0'};
      width: ${isOpen ? 'auto' : '0'};
      overflow: hidden;
      white-space: nowrap;
    }

    .sidebar-item {
      display: flex;
      align-items: center;
      gap: ${isOpen ? '12px' : '0'};
      padding: 10px 12px;
      margin-bottom: 6px;
      border-radius: 10px;
      text-decoration: none;
      color: var(--sidebar-text);
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 14px;
      justify-content: ${isOpen ? 'flex-start' : 'center'};
    }

    .sidebar-item:hover {
      background: var(--sidebar-hover-bg);
      color: var(--sidebar-accent);
    }

    .sidebar-item.active {
      background: var(--sidebar-accent-soft);
      color: var(--sidebar-accent);
      font-weight: 600;
    }

    .sidebar-item-icon {
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .sidebar-item-label {
      white-space: nowrap;
      overflow: hidden;
      opacity: ${isOpen ? '1' : '0'};
      width: ${isOpen ? 'auto' : '0'};
      transition: opacity 0.2s ease, width 0.2s ease;
    }

    .sidebar-footer {
      padding: 10px 6px 12px;
      border-top: 1px solid var(--sidebar-panel-border);
      margin-top: auto;
    }

    .sidebar-account {
      display: flex;
      align-items: center;
      gap: ${isOpen ? '12px' : '0'};
      padding: 10px 12px;
      border-radius: 10px;
      text-decoration: none;
      color: var(--sidebar-text);
      margin-bottom: 8px;
      transition: all 0.2s ease;
      justify-content: ${isOpen ? 'flex-start' : 'center'};
      border: 1px solid var(--sidebar-panel-border);
      background: var(--sidebar-bg);
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
    }

    .sidebar-account:hover {
      background: var(--sidebar-hover-bg);
      color: var(--sidebar-accent);
    }

    .sidebar-account.active {
      background: var(--sidebar-accent-soft);
      color: var(--sidebar-accent);
      font-weight: 600;
    }

    .account-avatar {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid var(--sidebar-panel-border);
      flex-shrink: 0;
    }

    .sidebar-logout {
      display: flex;
      align-items: center;
      gap: ${isOpen ? '12px' : '0'};
      padding: 10px 12px;
      background: var(--sidebar-footer-bg);
      border: 1px solid var(--sidebar-panel-border);
      border-radius: 10px;
      color: var(--sidebar-accent);
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 14px;
      width: 100%;
      justify-content: ${isOpen ? 'flex-start' : 'center'};
    }

    .sidebar-logout:hover {
      background: var(--sidebar-accent);
      border-color: var(--sidebar-accent);
      color: white;
    }

    .toggle-btn {
      position: absolute;
      right: -10px;
      top: 16px;
      width: 24px;
      height: 24px;
      background: var(--sidebar-accent);
      border: 2px solid var(--sidebar-panel-bg);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    }

    .toggle-btn:hover {
      background: var(--sidebar-accent);
      transform: scale(1.1);
    }

    .theme-btn {
      width: 100%;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: ${isOpen ? 'space-between' : 'center'};
      color: var(--sidebar-text);
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid var(--sidebar-panel-border);
      background: var(--sidebar-bg);
      padding: 0 10px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
    }

    .theme-btn:hover {
      background: var(--sidebar-hover-bg);
      color: var(--sidebar-accent);
    }

    .theme-label {
      opacity: ${isOpen ? '1' : '0'};
      width: ${isOpen ? 'auto' : '0'};
      overflow: hidden;
      white-space: nowrap;
      transition: opacity 0.2s ease, width 0.2s ease;
    }

    .theme-indicator {
      width: 28px;
      height: 18px;
      border-radius: 99px;
      background: var(--theme-track);
      position: relative;
      flex-shrink: 0;
    }

    .theme-indicator::after {
      content: '';
      position: absolute;
      left: ${theme === 'dark' ? '12px' : '2px'};
      top: 2px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--theme-knob);
      transition: left 0.2s ease;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .sidebar-wrapper {
        width: ${isOpen ? '252px' : '78px'};
      }
    }

    @media (max-width: 640px) {
      .sidebar-wrapper {
        position: fixed;
        left: ${isOpen ? '0' : '-252px'};
        width: 252px;
        height: 100vh;
        top: 0;
        box-shadow: ${isOpen ? '0 0 20px rgba(0, 0, 0, 0.3)' : 'none'};
        transition: left 0.3s ease;
      }

      .sidebar-content {
        padding-top: 14px;
      }
    }
  `;

  const avatarLetter = 'NX';
  const accountAvatar = user?.avatar || user?.profilePicture || '/default-avatar.svg';

  return (
    <>
      <style>{sidebarStyles}</style>
      <div className="sidebar-wrapper">
        <div className="sidebar-content">
          <div className="brand-head">
            <div className="brand-logo">{avatarLetter}</div>
            <div>
              <div className="brand-name">Nexovate</div>
              <div className="brand-tagline">Smart Career Hub</div>
            </div>
          </div>

          <div className="sidebar-menu">
            {menuItems.map((item) => (
              item.path ? (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                  title={item.name}
                >
                  <div className="sidebar-item-icon">{item.icon}</div>
                  <div className="sidebar-item-label">{item.name}</div>
                </Link>
              ) : (
                <div key={item.name} className="sidebar-item" title={item.name}>
                  <div className="sidebar-item-icon">{item.icon}</div>
                  <div className="sidebar-item-label">{item.name}</div>
                </div>
              )
            ))}
          </div>

          <div className="sidebar-footer">
            <Link to="/profile" className={`sidebar-account ${isActive('/profile') ? 'active' : ''}`} title="Account">
              <div className="sidebar-item-icon">
                <img src={accountAvatar} alt="Account" className="account-avatar" />
              </div>
              <div className="sidebar-item-label">Account</div>
            </Link>

            <button onClick={handleLogout} className="sidebar-logout" title="Logout">
              <div className="sidebar-item-icon"><IconLogout /></div>
              <div className="sidebar-item-label">Logout</div>
            </button>

            <button className="theme-btn" title="Toggle theme" style={{ marginTop: '8px' }} onClick={toggleTheme}>
              <span className="theme-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                {theme === 'dark' ? <IconMoon /> : <IconSun />} {theme === 'dark' ? 'Dark mode' : 'Light mode'}
              </span>
              <span className="theme-indicator" />
            </button>
          </div>
        </div>

        <button
          className="toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? 'Collapse' : 'Expand'}
        >
          {isOpen ? '❮' : '❯'}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
