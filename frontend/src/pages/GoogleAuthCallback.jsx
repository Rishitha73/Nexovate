import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const oauthError = searchParams.get('oauthError');

    if (oauthError) {
      navigate(`/login?oauthError=${encodeURIComponent(oauthError)}`, { replace: true });
      return;
    }

    if (!token) {
      navigate('/login?oauthError=Google login failed', { replace: true });
      return;
    }

    const user = {
      _id: searchParams.get('_id') || '',
      name: searchParams.get('name') || '',
      email: searchParams.get('email') || '',
      role: searchParams.get('role') || 'user',
    };

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    updateUser(user);
    navigate('/dashboard', { replace: true });
  }, [navigate, searchParams, updateUser]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        fontFamily: 'DM Sans, sans-serif',
        color: '#6b7280',
        background: 'linear-gradient(135deg, #faf9ff 0%, #f5f3ff 100%)'
      }}
    >
      Completing Google sign in...
    </div>
  );
};

export default GoogleAuthCallback;
