import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Nexovate</h1>
        <p className="home-description">
          Your next-generation platform for innovation and growth
        </p>
        <div className="home-features">
          <div className="feature-card">
            <h3>🚀 Fast & Modern</h3>
            <p>Built with the latest technologies for optimal performance</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure</h3>
            <p>Enterprise-grade security for your data</p>
          </div>
          <div className="feature-card">
            <h3>📱 Responsive</h3>
            <p>Works seamlessly on all devices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
