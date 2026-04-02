import { MdArrowOutward } from "react-icons/md";
import "./styles/Certifications.css";

const certs = [
  {
    name: "Digital Systems: From Logic Gates to Processors",
    date: "Oct 2024",
    link: "#", // Update with your actual URL
  },
  {
    name: "Mastering Data Structures and Algorithms",
    date: "July 2024",
    link: "#", // Update with your actual URL
  },
  {
    name: "Master Generative AI & Generative AI tools",
    date: "Oct 2023",
    link: "#", // Update with your actual URL
  },
  {
    name: "Fundamentals of Network Communication",
    date: "Sep 2024",
    link: "#", // Update with your actual URL
  },
];

const Certifications = () => {
  return (
    <div className="cert-section section-container" id="certifications">
      <div className="cert-container">
        <h2 className="title">
          My <br />
          <span>Certifications</span>
        </h2>
        
        <div className="cert-list">
          {certs.map((cert, index) => (
            <div className="cert-card" key={index}>
              <div className="cert-info">
                <h3>{cert.name}</h3>
                <p>{cert.date}</p>
              </div>
              <a href={cert.link} target="_blank" rel="noreferrer" className="cert-link" data-cursor="disable">
                View Certificate <MdArrowOutward />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
