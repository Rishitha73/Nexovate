import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #faf9ff;
    color: #1a1a2e;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideRight {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  .login-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #faf9ff 0%, #f5f3ff 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .login-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(139, 92, 246, 0.15);
    display: flex;
    max-width: 900px;
    width: 100%;
    animation: fadeUp 0.8s ease forwards;
  }

  .login-left {
    flex: 1;
    background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #6366f1 100%);
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    border-radius: 20px 0 0 20px;
  }

  .login-left::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  .login-left::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -5%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
  }

  .login-left-content {
    position: relative;
    z-index: 2;
    text-align: center;
    animation: slideLeft 0.8s ease forwards 0.2s;
    opacity: 0;
  }

  .login-left h1 {
    color: white;
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-family: 'Syne', sans-serif;
  }

  .login-left p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    line-height: 1.8;
    max-width: 280px;
    margin-bottom: 30px;
  }

  .login-right {
    flex: 1;
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: slideRight 0.8s ease forwards 0.3s;
    opacity: 0;
  }

  .login-right h2 {
    color: #1a1a2e;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 10px;
    font-family: 'Syne', sans-serif;
  }

  .login-subtitle {
    color: #8b5cf6;
    font-size: 14px;
    margin-bottom: 40px;
    opacity: 0.8;
  }

  .form-group {
    margin-bottom: 20px;
    animation: fadeUp 0.6s ease forwards;
  }

  .form-group:nth-child(2) { animation-delay: 0.4s; }
  .form-group:nth-child(3) { animation-delay: 0.5s; }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    color: #1a1a2e;
    font-weight: 600;
    font-size: 14px;
  }

  .form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #f0eeff;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: all 0.3s ease;
    background: #faf9ff;
  }

  .form-group input:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    background: white;
  }

  .login-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    font-size: 13px;
  }

  .remember-me {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #1a1a2e;
    cursor: pointer;
  }

  .forgot-link {
    color: #8b5cf6;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .forgot-link:hover {
    color: #7c3aed;
  }

  .login-btn {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    color: white;
    border: none;
    padding: 14px 0;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 20px;
    animation: fadeUp 0.6s ease forwards 0.6s;
    opacity: 0;
  }

  .login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
  }

  .login-signup {
    text-align: center;
    font-size: 14px;
    color: #1a1a2e;
    animation: fadeUp 0.6s ease forwards 0.7s;
    opacity: 0;
  }

  .login-signup a {
    color: #8b5cf6;
    text-decoration: none;
    font-weight: 700;
    transition: color 0.3s ease;
  }

  .login-signup a:hover {
    color: #7c3aed;
  }

  @media (max-width: 768px) {
    .login-card {
      flex-direction: column;
    }

    .login-left {
      border-radius: 20px 20px 0 0;
      padding: 40px 30px;
    }

    .login-right {
      padding: 40px 30px;
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-container">
        <div className="login-card">
          {/* Left Section */}
          <div className="login-left">
            <div className="login-left-content">
              <h1>Welcome Back</h1>
              <p>Sign in to your account to continue exploring amazing opportunities and features.</p>
              <svg width="120" height="120" viewBox="0 0 120 120" style={{ animation: "float 3s ease-in-out infinite" }}>
                <circle cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />
                <path d="M 60 20 Q 80 40 80 60 Q 80 80 60 90 Q 40 80 40 60 Q 40 40 60 20" fill="white" opacity="0.9" />
                <circle cx="60" cy="55" r="8" fill="#6366f1" />
                <path d="M 45 65 L 75 65" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Right Section */}
          <div className="login-right">
            <h2>Sign In</h2>
            <p className="login-subtitle">Enter your credentials below</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div style={{ color: "#ef4444", fontSize: "13px", marginBottom: "20px" }}>{error}</div>}

              <div className="login-footer">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <a className="forgot-link" href="#forgot">Forgot password?</a>
              </div>

              <button type="submit" className="login-btn">Sign In</button>
            </form>

            <div className="login-signup">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}