import "./Developers.css";

function Developers() {
  return (
    <div className="developers-page">

      <h1>Our Developers</h1>

      <p className="developer-subtitle">
        Meet talented developers from our community.
      </p>

      <div className="developers-container">

        <div className="developer-card">
          <div className="developer-image">
            
          </div>

          <h2>Meghana Sree</h2>

          <p>Frontend Developer</p>

          <button>
            View Profile
          </button>
        </div>

        <div className="developer-card">
          <div className="developer-image">
            
          </div>

          <h2>Alex Johnson</h2>

          <p>Backend Developer</p>

          <button>
            View Profile
          </button>
        </div>

        <div className="developer-card">
          <div className="developer-image">
            
          </div>

          <h2>Sarah Lee</h2>

          <p>Cloud Engineer</p>

          <button>
            View Profile
          </button>
        </div>

      </div>

    </div>
  );
}

export default Developers;