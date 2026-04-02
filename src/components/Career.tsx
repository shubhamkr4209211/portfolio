import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* Education */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech – Computer Science &amp; Engineering</h4>
                <h5>Lovely Professional University, Punjab</h5>
              </div>
              <h3>Aug '22 – Present</h3>
            </div>
            <p>
              Pursuing Bachelor of Technology in Computer Science and Engineering with a CGPA of 6.3.
              Building strong foundations in data structures, algorithms, cloud computing, and full-stack
              web development. Actively participating in practical labs, group projects, and technical coursework.
            </p>
          </div>

          {/* DevOps Project Experience */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>DevOps &amp; Cloud – Personal Projects</h4>
                <h5>Self-Initiated | Remote</h5>
              </div>
              <h3>Jan '25</h3>
            </div>
            <p>
              Built microservices architecture using Docker and containerized application deployments.
              Implemented GitHub Actions and GitLab CI/CD workflows for automated testing and production
              pipelines. Practised Jenkins for build automation. Explored Kubernetes for container
              orchestration and AWS for cloud infrastructure management.
            </p>
          </div>

          {/* Co-curricular */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Event Coordinator &amp; Community Volunteer</h4>
                <h5>LPU &amp; NGO Activities</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Worked with an NGO to spread awareness about sustainable environment practices among children.
              Serving as Event Coordinator for college activities — assisting in planning, coordinating, and
              executing student-focused campus events. Managing social media and outreach operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
