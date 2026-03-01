import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="welcome-card">
          <h2>Welcome back, {user?.name || 'User'}!</h2>
          <p>Email: {user?.email}</p>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>📊 Analytics</h3>
            <p>View your analytics and insights</p>
          </div>
          <div className="dashboard-card">
            <h3>⚙️ Settings</h3>
            <p>Manage your account settings</p>
          </div>
          <div className="dashboard-card">
            <h3>📈 Reports</h3>
            <p>Generate and view reports</p>
          </div>
          <div className="dashboard-card">
            <h3>👥 Team</h3>
            <p>Manage your team members</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
