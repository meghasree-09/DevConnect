import "./Features.css";

function Features() {
  return (
    <div className="features-page">

      <h1>Our Features</h1>

      <p className="feature-subtitle">
        Everything you need to connect,
        collaborate, and grow as a developer.
      </p>

      <div className="feature-container">

        <div className="feature-card">
          <h2> Developer Profiles</h2>

          <p>
            Create your professional profile,
            showcase skills, technologies,
            achievements, and experience.
          </p>
        </div>

        <div className="feature-card">
          <h2>Project Showcase</h2>

          <p>
            Upload and display your projects,
            GitHub repositories, and portfolios.
          </p>
        </div>

        <div className="feature-card">
          <h2> Team Collaboration</h2>

          <p>
            Find teammates and collaborate on
            innovative projects.
          </p>
        </div>

        <div className="feature-card">
          <h2> Community Chat</h2>

          <p>
            Interact with developers, discuss
            technologies, and share knowledge.
          </p>
        </div>

        <div className="feature-card">
          <h2> Coding Challenges</h2>

          <p>
            Participate in challenges and improve
            your problem-solving skills.
          </p>
        </div>

        <div className="feature-card">
          <h2> Career Growth</h2>

          <p>
            Get internship opportunities, job
            referrals, and industry guidance.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Features;