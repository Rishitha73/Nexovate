import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Please enter password and confirm password');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const data = await authService.resetPassword(token, password, confirmPassword);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        }));
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to reset password');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, #faf9ff 0%, #f5f3ff 100%)', padding: 20 }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 420, background: '#fff', border: '1.5px solid #ede9fe', borderRadius: 16, padding: 24, boxShadow: '0 14px 36px rgba(124, 58, 237, 0.12)' }}>
        <h2 style={{ marginBottom: 8, color: '#1a1a2e', fontFamily: 'Syne, sans-serif' }}>Reset Password</h2>
        <p style={{ marginBottom: 16, color: '#6b7280', fontSize: 14 }}>Set your new account password below.</p>

        <label htmlFor="new-password" style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1a1a2e' }}>New Password</label>
        <input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #ede9fe', marginBottom: 14 }}
        />

        <label htmlFor="confirm-password" style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1a1a2e' }}>Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #ede9fe', marginBottom: 14 }}
        />

        {error && <div style={{ color: '#dc2626', marginBottom: 12, fontSize: 13 }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ width: '100%', border: 'none', borderRadius: 10, padding: '12px 16px', color: '#fff', fontWeight: 700, background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', cursor: 'pointer' }}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        <div style={{ marginTop: 14, textAlign: 'center', fontSize: 14 }}>
          <Link to="/login" style={{ color: '#8b5cf6', textDecoration: 'none', fontWeight: 700 }}>Back to Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
