import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to OpenMask</h1>
        <p>Discover, collect, and sell extraordinary NFTs</p>
        <div className="cta-buttons">
          <button className="explore-btn">Explore</button>
          <button className="create-btn">Create</button>
        </div>
      </div>
      <div className="featured-section">
        <h2>Featured NFTs</h2>
        <div className="featured-grid">
          {/* Add featured NFTs here */}
        </div>
      </div>
    </div>
  );
}

export default Home; 