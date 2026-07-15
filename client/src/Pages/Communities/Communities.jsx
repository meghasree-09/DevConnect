import "./Communities.css";

function Communities() {
  return (
    <div className="communities-page">

      <h1>Developer Communities</h1>

      <p className="community-subtitle">
        Join communities, learn together,
        and collaborate with developers.
      </p>

      <div className="community-container">

        <div className="community-card">
          <h2>Frontend Developers</h2>

          <p>
            Discuss HTML, CSS, JavaScript,
            React, UI/UX and frontend trends.
          </p>

          <button>
            Join Community
          </button>
        </div>

        <div className="community-card">
          <h2>Backend Developers</h2>

          <p>
            Learn Node.js, Express, APIs,
            databases and server-side development.
          </p>

          <button>
            Join Community
          </button>
        </div>

        <div className="community-card">
          <h2>Python Developers</h2>

          <p>
            Share Python projects, Flask,
            Django and automation ideas.
          </p>

          <button>
            Join Community
          </button>
        </div>

        <div className="community-card">
          <h2>Cloud & AWS</h2>

          <p>
            Explore AWS, DevOps, Docker,
            Kubernetes and cloud technologies.
          </p>

          <button>
            Join Community
          </button>
        </div>

        <div className="community-card">
          <h2>Machine Learning</h2>

          <p>
            Discuss AI, ML models,
            data science and generative AI.
          </p>

          <button>
            Join Community
          </button>
        </div>

        <div className="community-card">
          <h2>Open Source</h2>

          <p>
            Contribute to open-source projects
            and collaborate globally.
          </p>

          <button>
            Join Community
          </button>
        </div>

      </div>

    </div>
  );
}

export default Communities;