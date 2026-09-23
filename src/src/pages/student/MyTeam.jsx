import React, { useState } from 'react';
import StudentLayout from '../../components/layout/StudentLayout';
import './MyTeam.css';

/**
 * MyTeam Component
 * Route: /student/team
 */
function MyTeam() {
  const [teamInfo, setTeamInfo] = useState({
    name: 'Team NeuralEdge',
    code: 'NE-2026-X8',
    project: 'AcadPredict: Academic Project Collaboration & Risk Prediction Platform',
    status: 'Confirmed (4/4 Members)',
    formationDate: 'Aug 28, 2026',
  });

  const [members, setMembers] = useState([
    {
      id: 'm-1',
      name: 'Student User',
      email: 'student@college.edu',
      rollNo: '2023CSB1042',
      role: 'Team Leader & Frontend Lead',
      isLeader: true,
      isSelf: true,
      skills: ['React.js', 'UI/UX Design', 'Vite', 'Client Routing'],
      status: 'Active',
    },
    {
      id: 'm-2',
      name: 'Alex Rivera',
      email: 'alex.rivera@college.edu',
      rollNo: '2023CSB1015',
      role: 'Machine Learning Engineer',
      isLeader: false,
      isSelf: false,
      skills: ['Python', 'Scikit-Learn', 'Risk Modeling', 'Pandas'],
      status: 'Active',
    },
    {
      id: 'm-3',
      name: 'Priya Sharma',
      email: 'priya.sharma@college.edu',
      rollNo: '2023CSB1089',
      role: 'Backend API Developer',
      isLeader: false,
      isSelf: false,
      skills: ['Spring Boot', 'REST APIs', 'JWT Auth', 'PostgreSQL'],
      status: 'Active',
    },
    {
      id: 'm-4',
      name: 'David Chen',
      email: 'david.chen@college.edu',
      rollNo: '2023CSB1033',
      role: 'Database & QA Engineer',
      isLeader: false,
      isSelf: false,
      skills: ['SQL', 'Unit Testing', 'Docker', 'Documentation'],
      status: 'Active',
    },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: '' });
  const [joinCode, setJoinCode] = useState('');
  const [notification, setNotification] = useState(null);

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteForm.name.trim() || !inviteForm.email.trim()) {
      alert('Please enter both student name and email.');
      return;
    }

    const newMember = {
      id: `m-${Date.now()}`,
      name: inviteForm.name,
      email: inviteForm.email,
      rollNo: '2023CSB' + Math.floor(1000 + Math.random() * 900),
      role: inviteForm.role || 'Team Member',
      isLeader: false,
      isSelf: false,
      skills: ['Engineering', 'Collaboration'],
      status: 'Invitation Pending',
    };

    setMembers([...members, newMember]);
    setShowInviteModal(false);
    setInviteForm({ name: '', email: '', role: '' });
    setNotification(`Invitation successfully sent to ${inviteForm.name}!`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinCode.trim()) {
      alert('Please enter a valid Team Code.');
      return;
    }
    setShowJoinModal(false);
    setNotification(`Request to join team with code "${joinCode}" submitted to coordinator.`);
    setJoinCode('');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleRemoveMember = (memberId, memberName) => {
    const confirmRemove = window.confirm(
      `Are you sure you want to remove ${memberName} from the project team?`
    );
    if (confirmRemove) {
      setMembers(members.filter((m) => m.id !== memberId));
      setNotification(`${memberName} has been removed from the team.`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <StudentLayout pageTitle="My Team">
      <div className="team-page">
        {/* Page Top Header */}
        <div className="team-header-row">
          <div>
            <h1 className="team-heading">My Team</h1>
            <p className="team-subheading">
              Collaborate with project teammates, manage roles, and review contribution allocations.
            </p>
          </div>

          <div className="team-actions-group">
            <button
              type="button"
              className="btn-join-team"
              onClick={() => setShowJoinModal(true)}
            >
              Join Another Team
            </button>
            <button
              type="button"
              className="btn-invite-member"
              onClick={() => setShowInviteModal(true)}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              <span>Invite Member</span>
            </button>
          </div>
        </div>

        {/* Alert Notification */}
        {notification && (
          <div className="alert-banner alert-success">
            <span>✓ {notification}</span>
          </div>
        )}

        {/* Team Overview Card */}
        <div className="card team-meta-card">
          <div className="team-meta-header">
            <div>
              <span className="team-code-tag">Code: {teamInfo.code}</span>
              <h2 className="team-display-name">{teamInfo.name}</h2>
              <p className="team-project-ref">Project: {teamInfo.project}</p>
            </div>
            <div className="team-status-box">
              <span className="team-status-label">Team Status</span>
              <span className="status-pill status-completed">{teamInfo.status}</span>
            </div>
          </div>
        </div>

        {/* Members Cards List */}
        <div className="members-grid">
          {members.map((member) => (
            <div
              key={member.id}
              className={`card member-card ${member.isSelf ? 'self-member-card' : ''}`}
            >
              <div className="member-card-top">
                <div className="member-avatar-lg">
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="member-identity">
                  <div className="member-title-row">
                    <h3 className="member-full-name">{member.name}</h3>
                    {member.isLeader && (
                      <span className="leader-badge">Leader</span>
                    )}
                    {member.isSelf && <span className="you-badge">You</span>}
                  </div>
                  <span className="member-role-title">{member.role}</span>
                  <span className="member-roll">{member.rollNo}</span>
                </div>
              </div>

              <div className="member-card-body">
                <div className="member-detail-line">
                  <span className="detail-key">Email:</span>
                  <span className="detail-val">{member.email}</span>
                </div>
                <div className="member-detail-line">
                  <span className="detail-key">Status:</span>
                  <span
                    className={`status-pill ${
                      member.status === 'Active' ? 'status-completed' : 'status-pending'
                    }`}
                  >
                    {member.status}
                  </span>
                </div>

                <div className="member-skills-section">
                  <span className="skills-label">Assigned Modules / Skills:</span>
                  <div className="skills-chips">
                    {member.skills.map((skill, idx) => (
                      <span key={idx} className="skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button: Remove member (only non-self members) */}
              <div className="member-card-foot">
                {!member.isSelf ? (
                  <button
                    type="button"
                    className="btn-remove-member"
                    onClick={() => handleRemoveMember(member.id, member.name)}
                  >
                    Remove Member
                  </button>
                ) : (
                  <span className="self-locked-note">Primary Account Lead</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Invite Member */}
        {showInviteModal && (
          <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
            <div className="modal-dialog modal-form" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>Invite Student to {teamInfo.name}</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowInviteModal(false)}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleInviteSubmit} className="modal-form-body">
                <div className="form-group-item">
                  <label>Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={inviteForm.name}
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group-item">
                  <label>College Institutional Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@college.edu"
                    value={inviteForm.email}
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group-item">
                  <label>Project Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend Developer, QA Engineer"
                    value={inviteForm.role}
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, role: e.target.value })
                    }
                  />
                </div>
                <div className="modal-foot-actions">
                  <button
                    type="button"
                    className="btn-secondary-btn"
                    onClick={() => setShowInviteModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary-submit">
                    Send Invitation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Join Team */}
        {showJoinModal && (
          <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
            <div className="modal-dialog modal-form" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>Join Existing Academic Team</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowJoinModal(false)}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleJoinSubmit} className="modal-form-body">
                <div className="form-group-item">
                  <label>Team Access Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NE-2026-X8 or provided team key"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                  />
                </div>
                <p className="modal-info-note">
                  Entering a team code will transmit a membership request to the respective
                  team leader and department coordinator.
                </p>
                <div className="modal-foot-actions">
                  <button
                    type="button"
                    className="btn-secondary-btn"
                    onClick={() => setShowJoinModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary-submit">
                    Submit Request
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

export default MyTeam;
