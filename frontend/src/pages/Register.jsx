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

  .register-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #faf9ff 0%, #f5f3ff 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .register-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(139, 92, 246, 0.15);
    display: flex;
    max-width: 900px;
    width: 100%;
    animation: fadeUp 0.8s ease forwards;
    flex-direction: row-reverse;
  }

  .register-left {
    flex: 1;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    border-radius: 0 20px 20px 0;
  }

  .register-left::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  .register-left::after {
    content: '';
    position: absolute;
    bottom: -30%;
    right: -5%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
  }

  .register-left-content {
    position: relative;
    z-index: 2;
    text-align: center;
    animation: slideRight 0.8s ease forwards 0.2s;
    opacity: 0;
  }

  .register-left h1 {
    color: white;
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-family: 'Syne', sans-serif;
  }

  .register-left p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    line-height: 1.8;
    max-width: 280px;
    margin-bottom: 30px;
  }

  .register-right {
    flex: 1;
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: slideLeft 0.8s ease forwards 0.3s;
    opacity: 0;
  }

  .register-right h2 {
    color: #1a1a2e;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 10px;
    font-family: 'Syne', sans-serif;
  }

  .register-subtitle {
    color: #8b5cf6;
    font-size: 14px;
    margin-bottom: 30px;
    opacity: 0.8;
  }

  .form-group {
    margin-bottom: 20px;
    animation: fadeUp 0.6s ease forwards;
  }

  .form-group:nth-child(2) { animation-delay: 0.35s; }
  .form-group:nth-child(3) { animation-delay: 0.4s; }
  .form-group:nth-child(4) { animation-delay: 0.45s; }
  .form-group:nth-child(5) { animation-delay: 0.5s; }

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
    color: #1a1a2e;
  }

  .form-group input::placeholder {
    color: #8b8b9e;
  }

  .form-group input:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    background: white;
  }

  .register-btn {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    color: white;
    border: none;
    padding: 14px 48px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
    animation: fadeUp 0.6s ease forwards 0.55s;
    opacity: 0;
  }

  .register-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
  }

  .register-login {
    text-align: center;
    font-size: 14px;
    color: #1a1a2e;
    margin-top: 20px;
    animation: fadeUp 0.6s ease forwards 0.6s;
    opacity: 0;
  }

  .register-login a {
    color: #8b5cf6;
    text-decoration: none;
    font-weight: 700;
    transition: color 0.3s ease;
  }

  .register-login a:hover {
    color: #7c3aed;
  }

  .feature-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 30px;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 12px;
    animation: fadeUp 0.6s ease forwards;
  }

  .feature-item:nth-child(1) { animation-delay: 0.4s; }
  .feature-item:nth-child(2) { animation-delay: 0.5s; }
  .feature-item:nth-child(3) { animation-delay: 0.6s; }

  .feature-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    flex-shrink: 0;
  }

  .feature-text {
    font-size: 13px;
    color: #1a1a2e;
    line-height: 1.4;
  }

  .feature-text strong {
    color: #8b5cf6;
  }

  .password-group {
    position: relative;
    display: flex;
    align-items: center;
  }

  .password-toggle {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    color: #8b5cf6;
    font-size: 18px;
    padding: 8px;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .password-toggle:hover {
    color: #7c3aed;
  }

  /* Tablet & Small Screens (768px and down) */
  @media (max-width: 768px) {
    .register-card {
      flex-direction: column-reverse;
      max-width: 100%;
      border-radius: 0;
    }

    .register-left {
      border-radius: 0;
      padding: 30px 25px;
      display: none;
    }

    .register-right {
      padding: 30px 25px;
      border-radius: 0;
      overflow-y: visible;
      max-height: none;
    }

    .register-right h2 {
      font-size: 24px;
      margin-bottom: 8px;
    }

    .form-group input {
      padding: 11px 14px;
      font-size: 13px;
    }

    .register-btn {
      padding: 12px 32px;
      font-size: 15px;
    }

    .feature-list {
      display: none;
    }
  }

  /* Mobile Screens (640px and down) */
  @media (max-width: 640px) {
    .register-container {
      padding: 10px;
      min-height: auto;
    }

    .register-card {
      border-radius: 0;
      box-shadow: none;
    }

    .register-right {
      padding: 20px 16px;
      min-height: auto;
    }

    .register-right h2 {
      font-size: 22px;
      margin-bottom: 6px;
    }

    .register-subtitle {
      font-size: 12px;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 14px;
    }

    .form-group label {
      font-size: 13px;
      margin-bottom: 6px;
    }

    .form-group input {
      padding: 10px 12px;
      font-size: 12px;
      border-radius: 8px;
    }

    .form-group input::placeholder {
      font-size: 11px;
    }

    .register-btn {
      padding: 12px 24px;
      font-size: 14px;
      margin-top: 8px;
    }

    .register-login {
      font-size: 12px;
      margin-top: 15px;
    }

    .password-toggle {
      font-size: 16px;
      padding: 6px;
      right: 8px;
    }

    .feature-list {
      gap: 10px;
      margin-top: 20px;
    }

    .feature-item {
      gap: 10px;
    }

    .feature-icon {
      width: 36px;
      height: 36px;
      font-size: 14px;
    }

    .feature-text {
      font-size: 12px;
    }
  }

  /* Very Small Phones (480px and down) */
  @media (max-width: 480px) {
    .register-container {
      padding: 0;
    }

    .register-right {
      padding: 20px 12px;
    }

    .register-right h2 {
      font-size: 20px;
    }

    .form-group input {
      padding: 10px 10px;
      font-size: 11px;
    }

    .register-btn {
      padding: 10px 20px;
      font-size: 13px;
    }

    .feature-icon {
      width: 32px;
      height: 32px;
      font-size: 12px;
    }
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      console.error('Register error:', err);
      // Handle different error formats
      let errorMessage = "Failed to register";
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.data?.message) {
        errorMessage = err.data.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="register-container">
        <div className="register-card">
          {/* Left Section */}
          <div className="register-left">
            <div className="register-left-content">
              <h1>Join Us Today</h1>
              <p>Create an account and unlock unlimited opportunities to grow your career.</p>
              <svg width="120" height="120" viewBox="0 0 120 120" style={{ animation: "float 3s ease-in-out infinite", marginTop: "20px" }}>
                <circle cx="60" cy="45" r="20" fill="white" opacity="0.9" />
                <path d="M 35 75 Q 35 65 60 65 Q 85 65 85 75 L 85 95 Q 85 105 60 105 Q 35 105 35 95 Z" fill="white" opacity="0.85" />
                <circle cx="50" cy="35" r="12" fill="rgba(255,255,255,0.7)" />
                <circle cx="70" cy="38" r="12" fill="rgba(255,255,255,0.7)" />
              </svg>

              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text"><strong>Instant Access</strong> to thousands of opportunities</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✦</div>
                  <div className="feature-text"><strong>Advanced Tools</strong> for job search and tracking</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">★</div>
                  <div className="feature-text"><strong>Premium Support</strong> dedicated to your success</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="register-right">
            <h2>Create Account</h2>
            <p className="register-subtitle">Fill in your details to get started</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-group">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-group">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                    title={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {error && <div style={{ color: "#ef4444", fontSize: "13px", marginBottom: "15px" }}>{error}</div>}

              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <div className="register-login">
              Already have an account? <Link to="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
