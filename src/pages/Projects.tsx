import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";
import { Link } from "react-router-dom";
import { FaPlus, FaEllipsisV, FaUsers, FaCheckCircle, FaStream, FaBriefcase } from "react-icons/fa";
import "./Projects.css";

const projectStats = [
  { title: "Total Projects", value: "135", change: "+13.38%", positive: true },
  { title: "Completed", value: "135", change: null },
  { title: "Ongoing", value: "65", change: null },
  { title: "Pending", value: "11", change: null },
];

const projects = [
  {
    id: 1,
    status: "pending",
    date: "2025-02-14",
    title: "Presbyterian Kutunse Conference Center Development",
    client: "SOUTHERN GAS LIMITED / JEYDAK SOLUTIONS",
    description: "Presbyterian Church of Ghana plans to develop a new church complex facility including two conference halls (1600 and 5000 capacity), a main administrative block, a library, a museum, a clinic, residential block...",
    assignees: [],
    metrics: { tasks: 12, files: 24, progress: 5 },
    lead: "Ama Boateng"
  },
  {
    id: 2,
    status: "ongoing",
    date: "2024-11-02",
    title: "Presbyterian Kutunse Conference Center Development",
    client: "SOUTHERN GAS LIMITED / JEYDAK SOLUTIONS",
    description: "Presbyterian Church of Ghana plans to develop a new church complex facility including two conference halls (1600 and 5000 capacity), a main administrative block, a library, a museum, a clinic, residential block...",
    assignees: ["KM", "AB", "JD", "SM", "PK"],
    metrics: { tasks: 12, files: 24, progress: 5 },
    lead: "Ama Boateng"
  },
  {
    id: 3,
    status: "on hold",
    date: "2025-05-10",
    title: "Presbyterian Kutunse Conference Center Development",
    client: "SOUTHERN GAS LIMITED / JEYDAK SOLUTIONS",
    description: "Presbyterian Church of Ghana plans to develop a new church complex facility including two conference halls (1600 and 5000 capacity), a main administrative block, a library, a museum, a clinic, residential block...",
    assignees: ["KM", "AB", "JD", "SM", "PK"],
    metrics: { tasks: 12, files: 24, progress: 5 },
    lead: "Kwame Mensah"
  },
  {
    id: 4,
    status: "pending",
    date: "2025-02-14",
    title: "Presbyterian Kutunse Conference Center Development",
    client: "SOUTHERN GAS LIMITED / JEYDAK SOLUTIONS",
    description: "Presbyterian Church of Ghana plans to develop a new church complex facility including two conference halls (1600 and 5000 capacity), a main administrative block, a library, a museum, a clinic, residential block...",
    assignees: [],
    metrics: { tasks: 12, files: 24, progress: 5 },
    lead: "Ama Boateng"
  },
  {
    id: 5,
    status: "completed",
    date: "2024-11-02",
    title: "Presbyterian Kutunse Conference Center Development",
    client: "SOUTHERN GAS LIMITED / JEYDAK SOLUTIONS",
    description: "Presbyterian Church of Ghana plans to develop a new church complex facility including two conference halls (1600 and 5000 capacity), a main administrative block, a library, a museum, a clinic, residential block...",
    assignees: ["KM", "AB", "JD", "SM", "PK"],
    metrics: { tasks: 12, files: 24, progress: 5 },
    lead: "Ama Boateng"
  },
  {
    id: 6,
    status: "on hold",
    date: "2025-05-10",
    title: "Presbyterian Kutunse Conference Center Development",
    client: "SOUTHERN GAS LIMITED / JEYDAK SOLUTIONS",
    description: "Presbyterian Church of Ghana plans to develop a new church complex facility including two conference halls (1600 and 5000 capacity), a main administrative block, a library, a museum, a clinic, residential block...",
    assignees: ["KM", "AB", "JD", "SM", "PK"],
    metrics: { tasks: 12, files: 24, progress: 5 },
    lead: "Kwame Mensah"
  },
];

export default function Projects() {
  return (
    <div className="projects-page">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <div className="page-toolbar">
            <div className="page-heading">
              <h1>Projects</h1>
            </div>
            <div className="page-actions">
              <button className="page-btn page-btn-primary">
                <FaPlus /> <span>New Project</span>
              </button>
              <button className="page-icon-btn" aria-label="More actions">
                <FaEllipsisV />
              </button>
            </div>
          </div>

          {/* PROJECT STATS */}
          <div className="project-stats-grid">
            {projectStats.map((stat, i) => (
              <div key={i} className="project-stat-card">
                <div className="stat-title">{stat.title}</div>
                <div className="stat-value">{stat.value}</div>
                {stat.change && (
                  <div className="stat-meta">
                    <span className={`stat-pill ${stat.positive ? 'positive' : ''}`}>
                      {stat.change}
                    </span>
                    <span className="stat-note">vs last year</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FILTERS */}
          <div className="filters-bar">
            <select className="filter-select"><option>Filter by Year</option></select>
            <select className="filter-select"><option>Filter by Client</option></select>
            <select className="filter-select"><option>Filter by Status</option></select>
            <select className="filter-select"><option>Filter by Lead</option></select>
            <button className="search-btn">
              Search <FaPlus style={{ transform: 'rotate(45deg)', fontSize: '0.8rem' }} />
            </button>
          </div>

          {/* PROJECTS GRID */}
          <div className="projects-grid">
            {projects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`} className="project-card-link">
                <div className="project-card">
                  <div className="card-top">
                    <span className={`status-badge ${project.status.replace(' ', '')}`}>
                      <span className="dot"></span> {project.status}
                    </span>
                    <span className="date">{project.date}</span>
                  </div>
                  
                  <h3 className="project-title">{project.title}</h3>
                  
                  <div className="client-info">
                     <FaUsers className="client-icon" />
                     <span className="client-name">CLIENT: {project.client}</span>
                  </div>

                  <p className="project-desc">{project.description}</p>

                  <div className="assignees-section">
                     {project.assignees.length > 0 ? (
                        <div className="avatar-group">
                           {project.assignees.map((a, i) => (
                             <div key={i} className="mini-avatar" title={a}>{a}</div>
                           ))}
                        </div>
                     ) : (
                        <span className="no-assignees">no assignees</span>
                     )}
                     {project.assignees.length > 0 && (
                       <span className="assigned-count">{project.assignees.length} assigned</span>
                     )}
                  </div>

                  <div className="project-metrics">
                     <div className="metric">
                        <FaStream className="m-icon" /> <span>{project.metrics.tasks}</span>
                     </div>
                     <div className="metric">
                        <FaBriefcase className="m-icon" /> <span>{project.metrics.files}</span>
                     </div>
                     <div className="metric">
                        <FaCheckCircle className="m-icon" /> <span>{project.metrics.progress}%</span>
                     </div>
                  </div>

                  <div className="project-footer">
                     <div className="lead-info">
                        Lead / Coordinator: <strong>{project.lead}</strong>
                     </div>
                     <span className="view-details">Click to view full details</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="pagination">
             <span className="page-num active">1</span>
             <span className="page-num">2</span>
             <span className="page-num">3</span>
             <span className="page-num">4</span>
             <span className="page-num">5</span>
             <span className="page-dots">...10</span>
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  );
}
