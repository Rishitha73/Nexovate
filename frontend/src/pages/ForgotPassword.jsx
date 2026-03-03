import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [devResetUrl, setDevResetUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setDevResetUrl('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.forgotPassword(email);
      setMessage(response.message || 'If your email exists, a reset link has been sent.');
      if (response.resetUrl) {
        setDevResetUrl(response.resetUrl);
      }
    } catch (err) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, #faf9ff 0%, #f5f3ff 100%)', padding: 20 }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 420, background: '#fff', border: '1.5px solid #ede9fe', borderRadius: 16, padding: 24, boxShadow: '0 14px 36px rgba(124, 58, 237, 0.12)' }}>
        <h2 style={{ marginBottom: 8, color: '#1a1a2e', fontFamily: 'Syne, sans-serif' }}>Forgot Password</h2>
        <p style={{ marginBottom: 16, color: '#6b7280', fontSize: 14 }}>Enter your account email and we will send a reset link.</p>

        <label htmlFor="forgot-email" style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1a1a2e' }}>Email Address</label>
        <input
          id="forgot-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #ede9fe', marginBottom: 14 }}
        />

        {error && <div style={{ color: '#dc2626', marginBottom: 12, fontSize: 13 }}>{error}</div>}
        {message && <div style={{ color: '#059669', marginBottom: 12, fontSize: 13 }}>{message}</div>}
        {devResetUrl && (
          <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12, wordBreak: 'break-all' }}>
            Dev reset link: <a href={devResetUrl}>{devResetUrl}</a>
          </div>
        )}

        <button type="submit" disabled={loading} style={{ width: '100%', border: 'none', borderRadius: 10, padding: '12px 16px', color: '#fff', fontWeight: 700, background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', cursor: 'pointer' }}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <div style={{ marginTop: 14, textAlign: 'center', fontSize: 14 }}>
          <Link to="/login" style={{ color: '#8b5cf6', textDecoration: 'none', fontWeight: 700 }}>Back to Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
