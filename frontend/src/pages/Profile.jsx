import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [smsAlerts, setSmsAlerts] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await userService.updateProfile(formData);
      updateUser(response.data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setLoading(false);
    }
  };

  const initials = (user?.name || 'U')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="profile-page">
      <div className="profile-layout">
        <section className="profile-main-card">
          <div className="profile-photo-wrap">
            <div className="profile-photo-fallback">{initials}</div>
          </div>

          <div className="profile-headline">
            <h1>My profile</h1>
            <div className="profile-meta">
              <span>Last login: 17 Aug 2026, 4:34</span>
              <span>{user?.email || 'Welcome back'}</span>
            </div>
          </div>

          {message.text && (
            <div className={`profile-message ${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form-grid">
            <div className="field-group">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="field-group field-group-full">
              <div className="sms-row">
                <span>SMS alerts activation</span>
                <button
                  type="button"
                  className={`sms-toggle ${smsAlerts ? 'active' : ''}`}
                  onClick={() => setSmsAlerts((current) => !current)}
                  aria-label="Toggle sms alerts"
                >
                  <span />
                </button>
              </div>
            </div>

            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </section>

        <div className="profile-side-column">
          <section className="side-card">
            <div className="side-card-head">
              <h2>My xPay accounts</h2>
              <button type="button" className="mini-action">Edit</button>
            </div>

            <div className="account-row">
              <div>
                <p className="row-title">Active account</p>
                <p className="row-subtitle">8640 5600 8084 4525</p>
              </div>
              <span className="status-chip blocked">Block account</span>
            </div>

            <div className="account-row">
              <div>
                <p className="row-title">Blocked account</p>
                <p className="row-subtitle">7982 2898 2143 2144</p>
              </div>
              <span className="status-chip unlocked">Unlock account</span>
            </div>
          </section>

          <section className="side-card">
            <div className="side-card-head">
              <h2>My bills</h2>
              <button type="button" className="mini-action">Filter by</button>
            </div>

            <div className="bill-row">
              <span className="dot paid" />
              <span>Phone bill</span>
              <span className="bill-chip paid-chip">Bill paid</span>
            </div>
            <div className="bill-row">
              <span className="dot due" />
              <span>Internet bill</span>
              <span className="bill-chip due-chip">Not paid</span>
            </div>
            <div className="bill-row">
              <span className="dot paid" />
              <span>House rent</span>
              <span className="bill-chip paid-chip">Bill paid</span>
            </div>
            <div className="bill-row">
              <span className="dot paid" />
              <span>Income tax</span>
              <span className="bill-chip paid-chip">Bill paid</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
