import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../components/layout/StudentLayout';
import './StudentDashboard.css';

/**
 * StudentDashboard Component for AcadPredict
 * Displays the core student overview dashboard
 */
function StudentDashboard() {
  const navigate = useNavigate();

  const [selectedProjectModal, setSelectedProjectModal] = useState(false);
  const [selectedRiskModal, setSelectedRiskModal] = useState(false);

  // Student User Profile
  const student = {
    name: 'Student User',
    email: 'student@college.edu',
    rollNo: '2023CSB1042',
    department: 'Computer Science & Engineering',
    semester: 'Semester VII - Final Year Project',
  };

  // Summary Metrics
  const summaryMetrics = [
    {
      id: 'active-projects',
      title: 'Active Projects',
      value: '1',
      subtitle: 'Final Year Capstone',
      badge: 'Assigned',
      badgeType: 'badge-success',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: 'pending-tasks',
      title: 'Pending Tasks',
      value: '4',
      subtitle: '2 due this week',
      badge: 'Action Required',
      badgeType: 'badge-warning',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      id: 'upcoming-milestones',
      title: 'Upcoming Milestones',
      value: '2',
      subtitle: 'Next: SRS Review in 8 days',
      badge: 'On Schedule',
      badgeType: 'badge-info',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      ),
    },
    {
      id: 'risk-level',
      title: 'Current Risk Level',
      value: 'Medium',
      subtitle: 'Predictive Model Score',
      badge: 'Review Pending',
      badgeType: 'badge-amber',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  ];

  // Project Details
  const myProject = {
    title: 'AcadPredict: Academic Project Collaboration & Risk Prediction Platform',
    category: 'Full-Stack Machine Learning Web Application',
    status: 'In Progress',
    guide: 'Dr. K. S. Sharma (Associate Professor, CSE Dept.)',
    teamMembers: [
      { name: 'Student User', role: 'Team Lead & Frontend', isSelf: true },
      { name: 'Alex Rivera', role: 'ML Engineer' },
      { name: 'Priya Sharma', role: 'Backend Developer' },
      { name: 'David Chen', role: 'Database & QA' },
    ],
    progress: 68,
    lastUpdate: 'Updated 2 days ago by Student User',
  };

  // Recent Tasks
  const recentTasks = [
    {
      id: 't-1',
      name: 'Implement Student Dashboard UI & Navigation',
      dueDate: 'Oct 24, 2026',
      status: 'In Progress',
      priority: 'High',
    },
    {
      id: 't-2',
      name: 'Finalize Risk Prediction Dataset Preprocessing',
      dueDate: 'Oct 29, 2026',
      status: 'Pending',
      priority: 'High',
    },
    {
      id: 't-3',
      name: 'Draft Literature Survey Chapter for SRS',
      dueDate: 'Nov 03, 2026',
      status: 'Pending',
      priority: 'Medium',
    },
    {
      id: 't-4',
      name: 'Sync API Contract with Backend Team',
      dueDate: 'Nov 07, 2026',
      status: 'Pending',
      priority: 'Low',
    },
  ];

  // Upcoming Milestones
  const upcomingMilestones = [
    {
      id: 'm-1',
      name: 'Project Abstract & Guide Approval',
      date: 'Sep 15, 2026',
      status: 'Completed',
    },
    {
      id: 'm-2',
      name: 'Software Requirements Specification (SRS) & Architecture Review',
      date: 'Nov 12, 2026',
      status: 'Upcoming',
    },
    {
      id: 'm-3',
      name: 'Mid-Semester Project Progress Evaluation',
      date: 'Dec 05, 2026',
      status: 'Upcoming',
    },
  ];

  // Helper for priority badges
  const getPriorityBadgeClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  // Helper for status badges
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return 'status-completed';
      case 'in progress':
        return 'status-progress';
      case 'upcoming':
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <StudentLayout pageTitle="Student Dashboard">
      <div className="student-dashboard-page">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-text-col">
            <h1 className="dashboard-heading">Student Dashboard</h1>
            <p className="dashboard-welcome">
              Welcome back, <strong>{student.name}</strong> • {student.department}
            </p>
          </div>
          <div className="academic-term-badge">
            <span>{student.semester}</span>
          </div>
        </div>

        {/* 1. Four Summary Cards */}
        <section className="summary-cards-grid" aria-label="Dashboard Metrics">
          {summaryMetrics.map((card) => (
            <div key={card.id} className="summary-card">
              <div className="summary-card-top">
                <span className="summary-card-title">{card.title}</span>
                <span className="summary-card-icon">{card.icon}</span>
              </div>
              <div className="summary-card-body">
                <div className="summary-card-value">{card.value}</div>
                <span className={`summary-badge ${card.badgeType}`}>
                  {card.badge}
                </span>
              </div>
              <div className="summary-card-footer">{card.subtitle}</div>
            </div>
          ))}
        </section>

        {/* Two Column Grid */}
        <div className="dashboard-two-column-grid">
          {/* Left Column: My Project & Recent Tasks */}
          <div className="dashboard-column">
            {/* My Project Section */}
            <section className="card project-section-card">
              <div className="card-header">
                <div className="card-header-title-wrap">
                  <svg
                    className="section-title-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                  <h2 className="card-title">My Project</h2>
                </div>
                <span className="status-pill status-progress">
                  {myProject.status}
                </span>
              </div>

              <div className="project-details-body">
                <h3 className="project-name">{myProject.title}</h3>
                <p className="project-category">{myProject.category}</p>

                <div className="project-meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Assigned Guide:</span>
                    <span className="meta-value highlight-guide">
                      {myProject.guide}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Team Members:</span>
                    <div className="team-member-tags">
                      {myProject.teamMembers.map((m, idx) => (
                        <span
                          key={idx}
                          className={`team-tag ${m.isSelf ? 'self-tag' : ''}`}
                          title={`${m.name} (${m.role})`}
                        >
                          {m.name} {m.isSelf ? '(Lead)' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="project-progress-wrapper">
                  <div className="progress-info-row">
                    <span className="progress-label">Overall Completion</span>
                    <span className="progress-percent">
                      {myProject.progress}%
                    </span>
                  </div>
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${myProject.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="project-card-actions">
                  <button
                    type="button"
                    className="btn-primary-action"
                    onClick={() => setSelectedProjectModal(true)}
                  >
                    View Project Details
                  </button>
                  <button
                    type="button"
                    className="btn-link-action"
                    onClick={() => navigate('/student/projects')}
                  >
                    All Projects &rarr;
                  </button>
                </div>
              </div>
            </section>

            {/* Recent Tasks Section */}
            <section className="card tasks-section-card">
              <div className="card-header">
                <div className="card-header-title-wrap">
                  <svg
                    className="section-title-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <h2 className="card-title">Recent Tasks</h2>
                </div>
                <button
                  type="button"
                  className="card-header-link"
                  onClick={() => navigate('/student/tasks')}
                >
                  Manage Tasks ({recentTasks.length}) &rarr;
                </button>
              </div>

              <div className="tasks-table-responsive">
                <table className="tasks-table">
                  <thead>
                    <tr>
                      <th>Task Name</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTasks.map((task) => (
                      <tr key={task.id}>
                        <td className="task-name-cell">
                          <span className="task-name">{task.name}</span>
                        </td>
                        <td className="task-due-cell">{task.dueDate}</td>
                        <td>
                          <span
                            className={`status-pill ${getStatusBadgeClass(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`priority-pill ${getPriorityBadgeClass(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column: Risk Prediction & Upcoming Milestones */}
          <div className="dashboard-column">
            {/* Risk Prediction Card */}
            <section className="card risk-section-card">
              <div className="card-header">
                <div className="card-header-title-wrap">
                  <svg
                    className="section-title-icon icon-amber"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <h2 className="card-title">Risk Prediction</h2>
                </div>
                <span className="risk-level-badge badge-medium">
                  Risk Level: Medium
                </span>
              </div>

              <div className="risk-card-body">
                <div className="risk-meter-box">
                  <div className="risk-score-display">
                    <span className="risk-score-number">52</span>
                    <span className="risk-score-max">/ 100</span>
                  </div>
                  <div className="risk-score-label">
                    Moderate Delay Probability
                  </div>
                </div>

                <div className="risk-explanation-box">
                  <h4 className="explanation-title">Predictive Insight</h4>
                  <p className="explanation-text">
                    Machine learning analytics indicate a moderate schedule
                    delay risk based on your team&apos;s recent commit cadence
                    and 2 critical pending deliverables due prior to the
                    upcoming SRS submission.
                  </p>
                </div>

                <div className="risk-factors-list">
                  <div className="risk-factor-item">
                    <span className="factor-dot factor-warning"></span>
                    <span>Literature Survey review pending guide approval</span>
                  </div>
                  <div className="risk-factor-item">
                    <span className="factor-dot factor-safe"></span>
                    <span>Frontend and UI scaffolding on track</span>
                  </div>
                </div>

                <div className="risk-card-actions">
                  <button
                    type="button"
                    className="btn-risk-details"
                    onClick={() => setSelectedRiskModal(true)}
                  >
                    View Risk Details
                  </button>
                  <button
                    type="button"
                    className="btn-risk-analytics-link"
                    onClick={() => navigate('/student/risk')}
                  >
                    Full Analytics &rarr;
                  </button>
                </div>
              </div>
            </section>

            {/* Upcoming Milestones Section */}
            <section className="card milestones-section-card">
              <div className="card-header">
                <div className="card-header-title-wrap">
                  <svg
                    className="section-title-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                  <h2 className="card-title">Upcoming Milestones</h2>
                </div>
                <button
                  type="button"
                  className="card-header-link"
                  onClick={() => navigate('/student/milestones')}
                >
                  All Milestones &rarr;
                </button>
              </div>

              <div className="milestones-list">
                {upcomingMilestones.map((milestone, idx) => (
                  <div key={milestone.id} className="milestone-item">
                    <div className="milestone-node-col">
                      <span
                        className={`milestone-node ${getStatusBadgeClass(
                          milestone.status
                        )}`}
                      >
                        {milestone.status === 'Completed' ? '✓' : idx + 1}
                      </span>
                      {idx < upcomingMilestones.length - 1 && (
                        <div className="milestone-line"></div>
                      )}
                    </div>
                    <div className="milestone-details">
                      <div className="milestone-name-row">
                        <span className="milestone-name">
                          {milestone.name}
                        </span>
                        <span
                          className={`status-pill ${getStatusBadgeClass(
                            milestone.status
                          )}`}
                        >
                          {milestone.status}
                        </span>
                      </div>
                      <span className="milestone-date">
                        Target Date: {milestone.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ===================== MODALS ===================== */}
      {selectedProjectModal && (
        <div className="modal-backdrop" onClick={() => setSelectedProjectModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Project Overview</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProjectModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <h4>{myProject.title}</h4>
              <p className="modal-subtitle">{myProject.category}</p>
              <div className="modal-info-list">
                <p><strong>Faculty Guide:</strong> {myProject.guide}</p>
                <p><strong>Progress:</strong> {myProject.progress}% complete</p>
                <p><strong>Department:</strong> {student.department}</p>
                <p><strong>Team Members:</strong> {myProject.teamMembers.map(m => `${m.name} (${m.role})`).join(', ')}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setSelectedProjectModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedRiskModal && (
        <div className="modal-backdrop" onClick={() => setSelectedRiskModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Risk Analytics &amp; Prediction Model</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedRiskModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="risk-modal-badge badge-medium">
                Current Risk: Medium (Score: 52 / 100)
              </div>
              <p className="modal-text">
                AcadPredict uses machine learning models to assess delivery risk by analyzing
                code commit frequency, task closure velocity, and milestone timelines.
              </p>
              <div className="modal-recommendations">
                <h5>Recommended Next Steps:</h5>
                <ul>
                  <li>Schedule a weekly progress sync with your guide Dr. Sharma.</li>
                  <li>Complete &apos;Literature Survey Chapter for SRS&apos; before Nov 03.</li>
                  <li>Break down pending risk prediction dataset tasks into smaller sprints.</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setSelectedRiskModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
}

export default StudentDashboard;
