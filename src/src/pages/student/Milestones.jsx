import React, { useState } from 'react';
import StudentLayout from '../../components/layout/StudentLayout';
import './Milestones.css';

/**
 * Milestones Component
 * Route: /student/milestones
 */
function Milestones() {
  const [milestones] = useState([
    {
      id: 'm-1',
      name: 'Milestone 1: Project Topic Approval & Guide Assignment',
      description:
        'Submission of proposal abstract, guide consent endorsement, and coordinator panel ratification.',
      startDate: 'Aug 20, 2026',
      dueDate: 'Sep 15, 2026',
      status: 'Completed',
      completion: 100,
      isNextUpcoming: false,
      deliverables: ['Signed Proposal Document', 'Literature Abstract (PDF)'],
      evaluator: 'Dr. Sarah Jenkins (HOD)',
      grade: 'Approved / Grade A',
    },
    {
      id: 'm-2',
      name: 'Milestone 2: SRS & System Architecture Review',
      description:
        'Detailed Software Requirements Specification, UML diagrams, API contracts, and database entity schemas.',
      startDate: 'Sep 20, 2026',
      dueDate: 'Nov 12, 2026',
      status: 'In Progress',
      completion: 72,
      isNextUpcoming: true, // Upcoming milestone indicator
      deliverables: ['SRS Document v1.0', 'System Architecture Diagram', 'ER Diagrams'],
      evaluator: 'Dr. K. S. Sharma (Guide)',
      grade: 'Under Evaluation',
    },
    {
      id: 'm-3',
      name: 'Milestone 3: Mid-Semester Evaluation & Prototype Demo',
      description:
        'Working demo of core modules including Student and Guide portal interfaces with sample ML risk output.',
      startDate: 'Nov 15, 2026',
      dueDate: 'Dec 05, 2026',
      status: 'Upcoming',
      completion: 20,
      isNextUpcoming: false,
      deliverables: ['Live System Walkthrough', 'Sprint Progress Report', 'Test Case Matrix'],
      evaluator: 'Department Evaluation Committee',
      grade: 'Pending',
    },
    {
      id: 'm-4',
      name: 'Milestone 4: Final Implementation & Risk Model Integration',
      description:
        'Complete end-to-end integration of ML prediction engine, full API connectivity, and coordinator analytics.',
      startDate: 'Jan 10, 2027',
      dueDate: 'Mar 15, 2027',
      status: 'Upcoming',
      completion: 0,
      isNextUpcoming: false,
      deliverables: ['Production Release Bundle', 'Model Validation Report', 'Security Audit'],
      evaluator: 'External Examiner & Project Committee',
      grade: 'Pending',
    },
    {
      id: 'm-5',
      name: 'Milestone 5: Final Thesis Defense & Viva Voce',
      description:
        'Bound project report submission, institutional plagiarism check, and public committee defense presentation.',
      startDate: 'Mar 20, 2027',
      dueDate: 'Apr 25, 2027',
      status: 'Upcoming',
      completion: 0,
      isNextUpcoming: false,
      deliverables: ['Bound Final Thesis', 'Plagiarism Similarity Report (<15%)', 'Presentation Slides'],
      evaluator: 'External Board of Examiners',
      grade: 'Pending',
    },
  ]);

  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'in progress':
        return 'status-progress';
      case 'upcoming':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <StudentLayout pageTitle="Milestones">
      <div className="milestones-page">
        {/* Header */}
        <div className="milestones-header-row">
          <div>
            <h1 className="milestones-title">Academic Milestones</h1>
            <p className="milestones-subtitle">
              Follow official department submission checkpoints, review timelines, and deliverables.
            </p>
          </div>

          <div className="milestones-overview-chip">
            <span>Overall Progress: <strong>48% Complete</strong></span>
          </div>
        </div>

        {/* Milestone Timeline List */}
        <div className="milestones-timeline-container">
          {milestones.map((m, index) => (
            <div
              key={m.id}
              className={`timeline-milestone-card card ${
                m.isNextUpcoming ? 'next-milestone-highlight' : ''
              }`}
            >
              {/* Upcoming Milestone Callout Ribbon */}
              {m.isNextUpcoming && (
                <div className="upcoming-indicator-banner">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="banner-icon">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Upcoming Milestone Target &bull; Action Required</span>
                </div>
              )}

              <div className="milestone-content-inner">
                <div className="milestone-head-row">
                  <div className="milestone-badge-group">
                    <span className="milestone-step-pill">Phase {index + 1}</span>
                    <span className={`status-pill ${getStatusClass(m.status)}`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="milestone-dates">
                    <span className="date-span">
                      Window: <strong>{m.startDate}</strong> &rarr; <strong>{m.dueDate}</strong>
                    </span>
                  </div>
                </div>

                <h3 className="milestone-headline">{m.name}</h3>
                <p className="milestone-description">{m.description}</p>

                {/* Progress Bar */}
                <div className="milestone-prog-box">
                  <div className="prog-label-row">
                    <span>Phase Completion</span>
                    <strong>{m.completion}%</strong>
                  </div>
                  <div className="prog-bar-track">
                    <div
                      className="prog-bar-fill"
                      style={{ width: `${m.completion}%` }}
                    ></div>
                  </div>
                </div>

                {/* Deliverables Chips */}
                <div className="milestone-deliverables-row">
                  <span className="deliverables-label">Required Deliverables:</span>
                  <div className="deliverable-tags">
                    {m.deliverables.map((item, idx) => (
                      <span key={idx} className="deliverable-tag">
                        📄 {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Evaluation Details */}
                <div className="milestone-card-footer">
                  <div className="eval-info">
                    <span>Evaluator: <strong>{m.evaluator}</strong></span>
                    <span className="grade-val">Grade: <strong>{m.grade}</strong></span>
                  </div>
                  <button
                    type="button"
                    className="btn-milestone-details"
                    onClick={() => setSelectedMilestone(m)}
                  >
                    View Guidelines &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: View Milestone Details */}
        {selectedMilestone && (
          <div className="modal-overlay" onClick={() => setSelectedMilestone(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>{selectedMilestone.name}</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedMilestone(null)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-content-body">
                <p className="modal-desc">{selectedMilestone.description}</p>
                <div className="modal-detail-list">
                  <p><strong>Start Date:</strong> {selectedMilestone.startDate}</p>
                  <p><strong>Final Due Date:</strong> {selectedMilestone.dueDate}</p>
                  <p><strong>Status:</strong> {selectedMilestone.status}</p>
                  <p><strong>Progress:</strong> {selectedMilestone.completion}% complete</p>
                  <p><strong>Assigned Evaluator:</strong> {selectedMilestone.evaluator}</p>
                  <p><strong>Current Grade / Status:</strong> {selectedMilestone.grade}</p>
                </div>
                <div className="submission-checklist">
                  <h5>Mandatory Submission Checklist:</h5>
                  <ul>
                    {selectedMilestone.deliverables.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="modal-foot">
                <button
                  type="button"
                  className="btn-secondary-btn"
                  onClick={() => setSelectedMilestone(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}

export default Milestones;
