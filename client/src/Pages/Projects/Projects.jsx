import "./Projects.css";

function Projects() {
  return (
    <div className="projects-page">

      <h1>Featured Projects</h1>

      <p className="project-subtitle">
        Explore innovative projects built by developers.
      </p>

      <div className="projects-container">

        <div className="project-card">
          <h2>TravelGo</h2>

          <p>
            Cloud-based travel booking platform
            using Flask, AWS EC2, DynamoDB,
            and SNS.
          </p>

          <button>
            View Project
          </button>
        </div>

        <div className="project-card">
          <h2>DevConnect</h2>

          <p>
            Developer networking platform to
            connect, collaborate and showcase
            projects.
          </p>

          <button>
            View Project
          </button>
        </div>

        <div className="project-card">
          <h2>Anonymous Chat Box</h2>

          <p>
            Institution feedback platform for
            students using MongoDB and React.
          </p>

          <button>
            View Project
          </button>
        </div>

        <div className="project-card">
          <h2>Digital Complaint Box</h2>

          <p>
            Secure complaint management system
            for colleges and organizations.
          </p>

          <button>
            View Project
          </button>
        </div>

        <div className="project-card">
          <h2>Smart Shopping Cart</h2>

          <p>
            Interactive shopping cart application
            built using HTML, CSS and JavaScript.
          </p>

          <button>
            View Project
          </button>
        </div>

        <div className="project-card">
          <h2>Portfolio Website</h2>

          <p>
            Responsive personal portfolio website
            showcasing skills and achievements.
          </p>

          <button>
            View Project
          </button>
        </div>

      </div>

    </div>
  );
}

export default Projects;