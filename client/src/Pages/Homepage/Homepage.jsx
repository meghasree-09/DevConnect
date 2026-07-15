import "./Homepage.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* Navbar */}

      <nav className="navbar">

        <div className="logo">
          <div className="logo-circle">
            {"</>"}
          </div>

          <h2>DevConnect</h2>
        </div>

        <ul className="nav-links">

          <li>
            <button
              className="nav-link"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </li>

          <li>
            <button
              className="nav-link"
              onClick={() =>
                navigate("/features")
              }
            >
              Features
            </button>
          </li>

          <li>
            <button
              className="nav-link"
              onClick={() =>
                navigate("/developers")
              }
            >
              Developers
            </button>
          </li>

          <li>
            <button
              className="nav-link"
              onClick={() =>
                navigate("/projects")
              }
            >
              Projects
            </button>
          </li>

          <li>
            <button
              className="nav-link"
              onClick={() =>
                navigate("/communities")
              }
            >
              Communities
            </button>
          </li>

          <li>
            <button
              className="nav-link"
              onClick={() =>
                navigate("/contact")
              }
            >
              Contact
            </button>
          </li>

        </ul>

        <div className="nav-buttons">

          <button
            className="login-btn"
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </button>

          <button
            className="register-btn"
            onClick={() =>
              navigate("/register")
            }
          >
            Register
          </button>

        </div>

      </nav>

      {/* Hero */}

      <section className="hero">

  <div className="hero-left">

    <div className="badge">
       The Ultimate Developer Network
    </div>

    <h1>
      Connect.
      <br />
      Collaborate.
      <br />
      <span className="gradient-text">
        Build Together.
      </span>
    </h1>

    <p>
      Join a global community of developers.
      Showcase your skills, share your
      projects, find the perfect teammates,
      and build the future of software
      together.
    </p>

    <div className="hero-buttons">

      <button
        className="start-btn"
        onClick={() =>
          navigate("/register")
        }
      >
        Get Started →
      </button>

      <button
        className="explore-btn"
        onClick={() =>
          navigate("/developers")
        }
      >
        Explore Developers
      </button>

    </div>

  </div>

  {/* Right Side Circle */}

  <div className="hero-right">

    <div className="outer-ring"></div>

    <div className="main-circle">
      &gt;_
    </div>

    <div className="floating one">
      {"</>"}
    </div>

    <div className="floating two">
      DB
    </div>

    <div className="floating three">
      Git
    </div>

    <div className="floating four">
      AWS
    </div>

  </div>

</section>
<section className="features-section">

  <h1>
    Everything you need to
    <span> thrive</span>
  </h1>

  <p className="feature-text">
    DevConnect provides a comprehensive suite
    of tools designed specifically for developers
    to network, collaborate and grow.
  </p>

  <div className="feature-grid">

    <div className="feature-box">
      <div className="icon-box">DP</div>

      <h2>Developer Profiles</h2>

      <p>
        Create stunning profiles and showcase
        your skills and experience.
      </p>
    </div>

    <div className="feature-box">
      <div className="icon-box">PS</div>

      <h2>Project Showcase</h2>

      <p>
        Share your projects and professional
        work with the community.
      </p>
    </div>

    <div className="feature-box">
      <div className="icon-box">TF</div>

      <h2>Team Finder</h2>

      <p>
        Find teammates and collaborators
        for your next big project.
      </p>
    </div>

    <div className="feature-box">
      <div className="icon-box">RC</div>

      <h2>Real-Time Chat</h2>

      <p>
        Connect instantly with other developers.
      </p>
    </div>

    <div className="feature-box">
      <div className="icon-box">DC</div>

      <h2>Developer Communities</h2>

      <p>
        Join communities based on your interests.
      </p>
    </div>

    <div className="feature-box">
      <div className="icon-box">NT</div>

      <h2>Notifications</h2>

      <p>
        Stay updated with activities and requests.
      </p>
    </div>

    <div className="feature-box">
      <div className="icon-box">CG</div>

      <h2>Career Growth</h2>

      <p>
        Discover jobs, internships and referrals.
      </p>
    </div>

    <div className="feature-box">
      <div className="icon-box">SB</div>

      <h2>Skill Badges</h2>

      <p>
        Earn badges and showcase your expertise.
      </p>
    </div>

  </div>

</section>
      {/* Stats */}

      <section className="stats">

        <div>
          <h1>10K+</h1>
          <p>Developers</p>
        </div>

        <div>
          <h1>5K+</h1>
          <p>Projects</p>
        </div>

        <div>
          <h1>1K+</h1>
          <p>Communities</p>
        </div>

        <div>
          <h1>50K+</h1>
          <p>Connections</p>
        </div>

      </section>

      {/* How it works */}

    <section className="how-section">

  <h1>
    How it <span>works</span>
  </h1>

  <p className="how-text">
    From signing up to shipping your first
    collaborative project, the journey
    is seamless.
  </p>

  <div className="steps-line">

    <div className="step-card">
      <div className="step-icon">
        CA
      </div>

      <div className="step-number">
        1
      </div>

      <h3>Create Account</h3>

      <p>
        Join using Email or GitHub.
      </p>
    </div>

    <div className="step-card">
      <div className="step-icon">
        BP
      </div>

      <div className="step-number">
        2
      </div>

      <h3>Build Profile</h3>

      <p>
        Add your skills and projects.
      </p>
    </div>

    <div className="step-card">
      <div className="step-icon">
        UP
      </div>

      <div className="step-number">
        3
      </div>

      <h3>Upload Projects</h3>

      <p>
        Showcase your repositories.
      </p>
    </div>

    <div className="step-card">
      <div className="step-icon">
        C
      </div>

      <div className="step-number">
        4
      </div>

      <h3>Connect</h3>

      <p>
        Find peers and mentors.
      </p>
    </div>

    <div className="step-card">
      <div className="step-icon">
        COLL
      </div>

      <div className="step-number">
        5
      </div>

      <h3>Collaborate</h3>

      <p>
        Build and grow together.
      </p>
    </div>

  </div>

</section>

      {/* Testimonials */}

      <section className="section">

        <h1>
          Loved by developers
        </h1>

        <div className="card-grid">

          <div className="card">
            <p>
              DevConnect changed how I
              network.
            </p>

            <h3>
              Sarah Jenkins
            </h3>
          </div>

          <div className="card">
            <p>
              Project showcase feature is
              brilliant.
            </p>

            <h3>
              David Chen
            </h3>
          </div>

          <div className="card">
            <p>
              Communities are extremely
              useful.
            </p>

            <h3>
              Elena Rodriguez
            </h3>
          </div>

        </div>

      </section>

      {/* Communities */}

      <section className="section">

        <h1>
          Find your tribe
        </h1>

        <div className="card-grid">

          <div className="card">
            MERN Stack
          </div>

          <div className="card">
            Python
          </div>

          <div className="card">
            AI & ML
          </div>

          <div className="card">
            AWS Cloud
          </div>

          <div className="card">
            Java
          </div>

          <div className="card">
            Open Source
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="cta">

        <h1>
          Start Building Your Developer
          Network Today!
        </h1>

        <p>
          Join thousands of developers.
        </p>

        <div className="cta-buttons">

          <button
            onClick={() =>
              navigate("/register")
            }
          >
            Join DevConnect
          </button>

          <button
            onClick={() =>
              navigate("/projects")
            }
          >
            Explore Projects
          </button>

        </div>

      </section>

      {/* Footer */}

      <footer className="footer">

        <div>
          <h2>DevConnect</h2>

          <p>
            Connect, collaborate and
            build together.
          </p>
        </div>

        <div>
          <h3>Platform</h3>
          <p>Developers</p>
          <p>Projects</p>
          <p>Communities</p>
        </div>

        <div>
          <h3>Company</h3>
          <p>About</p>
          <p>Careers</p>
          <p>Contact</p>
        </div>

        <div>
          <h3>Legal</h3>
          <p>Privacy Policy</p>
          <p>Terms</p>
        </div>

      </footer>

    </div>
  );
}

export default Homepage;