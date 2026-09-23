import React, { useState } from 'react';
import StudentLayout from '../../components/layout/StudentLayout';
import './MyProjects.css';

/**
 * MyProjects Component
 * Route: /student/projects
 */
function MyProjects() {
  const [projects, setProjects] = useState([
    {
      id: 'proj-1',
      name: 'AcadPredict: Academic Project Collaboration & Risk Prediction Platform',
      domain: 'Machine Learning & Web Engineering',
      status: 'In Progress',
      guide: 'Dr. K. S. Sharma (Associate Professor, CSE)',
      teamName: 'Team NeuralEdge',
      members: ['Student User (Lead)', 'Alex Rivera', 'Priya Sharma', 'David Chen'],
      progress: 68,
      lastUpdated: 'Oct 17, 2026',
      academicYear: '2026-2027 (Final Year Capstone)',
      description:
        'A comprehensive platform for engineering institutes enabling predictive delay risk calculation, milestone tracking, and cross-team collaboration.',
    },
    {
      id: 'proj-2',
      name: 'IoT-Based Smart Energy Monitoring for College Laboratories',
      domain: 'Internet of Things & Embedded Systems',
      status: 'Completed',
      guide: 'Prof. M. Verma (Assistant Professor, ECE)',
      teamName: 'VoltSquad',
      members: ['Student User', 'Rahul Nair', 'Ayesha Khan'],
      progress: 100,
      lastUpdated: 'May 14, 2026',
      academicYear: '2025-2026 (Semester VI Mini-Project)',
      description:
        'Smart energy telemetry system utilizing ESP32 nodes and MQTT streaming to optimize electrical load during lab operating hours.',
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    domain: '',
    guide: '',
    teamName: '',
    description: '',
  });
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.name.trim() || !newProject.guide.trim()) {
      alert('Please provide both a project name and guide name.');
      return;
    }

    const created = {
      id: `proj-${Date.now()}`,
      name: newProject.name,
      domain: newProject.domain || 'Software Engineering',
      status: 'Proposal Draft',
      guide: newProject.guide,
      teamName: newProject.teamName || 'New Team',
      members: ['Student User (Lead)'],
      progress: 5,
      lastUpdated: 'Just now',
      academicYear: '2026-2027',
      description: newProject.description || 'Newly initiated project proposal.',
    };

    setProjects([created, ...projects]);
    setShowCreateModal(false);
    setNewProject({ name: '', domain: '', guide: '', teamName: '', description: '' });
    setNotification('Project created successfully in draft mode!');
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <StudentLayout pageTitle="My Projects">
      <div className="projects-page">
        {/* Header Bar */}
        <div className="page-header-row">
          <div>
            <h1 className="page-main-heading">My Projects</h1>
            <p className="page-main-subtitle">
              Manage your academic capstone, mini-projects, and thesis repositories.
            </p>
          </div>
          <button
            type="button"
            className="btn-create-project"
            onClick={() => setShowCreateModal(true)}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Create Project</span>
          </button>
        </div>

        {/* Success Alert */}
        {notification && (
          <div className="alert-banner alert-success">
            <span>✓ {notification}</span>
          </div>
        )}

        {/* Projects Cards List */}
        <div className="projects-list-grid">
          {projects.map((proj) => (
            <div key={proj.id} className="project-item-card">
              <div className="project-card-top">
                <div className="project-badge-row">
                  <span className="project-domain-tag">{proj.domain}</span>
                  <span
                    className={`status-pill ${
                      proj.status === 'Completed'
                        ? 'status-completed'
                        : proj.status === 'In Progress'
                        ? 'status-progress'
                        : 'status-pending'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>
                <h3 className="project-title-text">{proj.name}</h3>
                <p className="project-desc-short">{proj.description}</p>
              </div>

              <div className="project-info-grid">
                <div className="info-cell">
                  <span className="info-label">Guide</span>
                  <span className="info-value guide-highlight">{proj.guide}</span>
                </div>
                <div className="info-cell">
                  <span className="info-label">Team</span>
                  <span className="info-value">{proj.teamName}</span>
                </div>
                <div className="info-cell">
                  <span className="info-label">Last Updated</span>
                  <span className="info-value">{proj.lastUpdated}</span>
                </div>
                <div className="info-cell">
                  <span className="info-label">Term</span>
                  <span className="info-value">{proj.academicYear}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="project-progress-box">
                <div className="progress-text-row">
                  <span>Milestone Completion</span>
                  <span className="progress-num">{proj.progress}%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${proj.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="project-card-foot">
                <div className="team-avatars">
                  {proj.members.map((mem, i) => (
                    <span key={i} className="member-avatar-pill" title={mem}>
                      {mem.split(' ')[0]}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn-view-details"
                  onClick={() => setSelectedProject(proj)}
                >
                  View Details &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: View Details */}
        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>{selectedProject.name}</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-content-body">
                <div className="modal-meta-row">
                  <span className="status-pill status-progress">
                    {selectedProject.status}
                  </span>
                  <span className="domain-pill">{selectedProject.domain}</span>
                </div>
                <p className="modal-desc">{selectedProject.description}</p>
                <div className="modal-detail-list">
                  <p><strong>Faculty Guide:</strong> {selectedProject.guide}</p>
                  <p><strong>Team Name:</strong> {selectedProject.teamName}</p>
                  <p><strong>Team Members:</strong> {selectedProject.members.join(', ')}</p>
                  <p><strong>Progress:</strong> {selectedProject.progress}% completed</p>
                  <p><strong>Academic Cycle:</strong> {selectedProject.academicYear}</p>
                  <p><strong>Last Activity:</strong> {selectedProject.lastUpdated}</p>
                </div>
              </div>
              <div className="modal-foot">
                <button
                  type="button"
                  className="btn-secondary-btn"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Create Project */}
        {showCreateModal && (
          <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="modal-dialog modal-form" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>Create New Academic Project</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleCreateProject} className="modal-form-body">
                <div className="form-group-item">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Distributed Ledger for Academic Credential Verification"
                    value={newProject.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group-item">
                  <label>Technology / Domain</label>
                  <input
                    type="text"
                    name="domain"
                    placeholder="e.g. Machine Learning, Cloud Systems, Cybersecurity"
                    value={newProject.domain}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row-two">
                  <div className="form-group-item">
                    <label>Faculty Guide Name *</label>
                    <input
                      type="text"
                      name="guide"
                      required
                      placeholder="e.g. Dr. Sarah Jenkins"
                      value={newProject.guide}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group-item">
                    <label>Team Name</label>
                    <input
                      type="text"
                      name="teamName"
                      placeholder="e.g. Team Alpha"
                      value={newProject.teamName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group-item">
                  <label>Project Brief / Abstract</label>
                  <textarea
                    name="description"
                    rows="3"
                    placeholder="Provide a brief summary of the proposed project scope..."
                    value={newProject.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="modal-foot-actions">
                  <button
                    type="button"
                    className="btn-secondary-btn"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary-submit">
                    Save &amp; Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}

export default MyProjects;
