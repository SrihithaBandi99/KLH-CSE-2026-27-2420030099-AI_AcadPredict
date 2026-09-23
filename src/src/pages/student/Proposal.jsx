import React, { useState } from 'react';
import StudentLayout from '../../components/layout/StudentLayout';
import './Proposal.css';

/**
 * Proposal Component
 * Route: /student/proposal
 */
function Proposal() {
  const [formData, setFormData] = useState({
    title: 'AcadPredict: Academic Project Collaboration & Risk Prediction Platform',
    domain: 'Machine Learning & Full-Stack Web Development',
    guide: 'Dr. K. S. Sharma (Associate Professor, CSE)',
    problemStatement:
      'In academic engineering capstone projects, student teams frequently experience delayed milestones, lack of unified mentor feedback tracking, and unpredicted schedule slippage. Coordinators lack real-time predictive analytics to intervene before semester deadlines are breached.',
    objectives:
      '1. Develop a multi-role web platform for Students, Guides, and Coordinators.\n2. Implement a predictive machine learning model calculating milestone delay risk.\n3. Provide automated sprint tracking, document approvals, and task management.',
    expectedOutcome:
      'A deployed web platform integrated with predictive risk classification, reducing project backlog bottlenecks by 40% and enhancing guide evaluation workflows.',
    description:
      'AcadPredict serves as a centralized institutional hub for managing student projects from proposal submission to final viva defense.',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('Submitted - Under Guide Review');
  const [statusMessage, setStatusMessage] = useState(null);

  const facultyGuides = [
    'Dr. K. S. Sharma (Associate Professor, CSE)',
    'Dr. Sarah Jenkins (Professor & HOD, CSE)',
    'Prof. M. Verma (Assistant Professor, ECE)',
    'Dr. Ananya Roy (Associate Professor, IT)',
    'Prof. Robert Taylor (Assistant Professor, AI & DS)',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Project title is required.';
    if (!formData.domain.trim()) errs.domain = 'Technology/domain is required.';
    if (!formData.guide) errs.guide = 'Please select a faculty guide.';
    if (!formData.problemStatement.trim()) errs.problemStatement = 'Problem statement is required.';
    if (!formData.objectives.trim()) errs.objectives = 'Objectives are required.';
    if (!formData.expectedOutcome.trim()) errs.expectedOutcome = 'Expected outcome is required.';
    return errs;
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    setStatus('Draft Saved');
    setStatusMessage({
      type: 'info',
      text: 'Proposal draft saved locally. You can modify and submit anytime before the coordinator deadline.',
    });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatusMessage({
        type: 'error',
        text: 'Please resolve the highlighted validation errors before submitting.',
      });
      return;
    }

    setErrors({});
    setStatus('Submitted - Under Guide Review');
    setStatusMessage({
      type: 'success',
      text: 'Proposal successfully submitted to ' + formData.guide + ' for review!',
    });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  return (
    <StudentLayout pageTitle="Project Proposal">
      <div className="proposal-page">
        {/* Page Heading */}
        <div className="proposal-header-row">
          <div>
            <h1 className="proposal-title">Project Proposal</h1>
            <p className="proposal-subtitle">
              Submit and manage your formal capstone proposal for department evaluation.
            </p>
          </div>

          {/* Proposal Status Badge */}
          <div className="proposal-status-pill-box">
            <span className="status-label">Current Status:</span>
            <span
              className={`status-pill ${
                status.includes('Approved')
                  ? 'status-completed'
                  : status.includes('Draft')
                  ? 'status-pending'
                  : 'status-progress'
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Status Alert Banner */}
        {statusMessage && (
          <div className={`proposal-alert alert-${statusMessage.type}`}>
            <span>{statusMessage.text}</span>
          </div>
        )}

        <div className="proposal-layout-grid">
          {/* Main Form */}
          <div className="proposal-form-card card">
            <form onSubmit={handleSubmitProposal} noValidate>
              <div className="form-section-title">
                <h3>1. General Information</h3>
              </div>

              <div className="form-field-group">
                <label htmlFor="title">Project Title *</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  className={errors.title ? 'input-error' : ''}
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter formal academic project title"
                />
                {errors.title && <span className="field-err">{errors.title}</span>}
              </div>

              <div className="form-two-col">
                <div className="form-field-group">
                  <label htmlFor="domain">Technology / Domain *</label>
                  <input
                    id="domain"
                    type="text"
                    name="domain"
                    className={errors.domain ? 'input-error' : ''}
                    value={formData.domain}
                    onChange={handleChange}
                    placeholder="e.g. Artificial Intelligence, Cloud Computing"
                  />
                  {errors.domain && <span className="field-err">{errors.domain}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="guide">Faculty Guide Selection *</label>
                  <select
                    id="guide"
                    name="guide"
                    className={errors.guide ? 'input-error' : ''}
                    value={formData.guide}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Faculty Guide --</option>
                    {facultyGuides.map((guide, idx) => (
                      <option key={idx} value={guide}>
                        {guide}
                      </option>
                    ))}
                  </select>
                  {errors.guide && <span className="field-err">{errors.guide}</span>}
                </div>
              </div>

              <div className="form-field-group">
                <label htmlFor="description">Brief Summary / Abstract</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Summarize the core premise of your project"
                ></textarea>
              </div>

              <div className="form-section-title">
                <h3>2. Technical Scope &amp; Deliverables</h3>
              </div>

              <div className="form-field-group">
                <label htmlFor="problemStatement">Problem Statement *</label>
                <textarea
                  id="problemStatement"
                  name="problemStatement"
                  rows="3"
                  className={errors.problemStatement ? 'input-error' : ''}
                  value={formData.problemStatement}
                  onChange={handleChange}
                  placeholder="What key academic or industrial challenge does this project solve?"
                ></textarea>
                {errors.problemStatement && (
                  <span className="field-err">{errors.problemStatement}</span>
                )}
              </div>

              <div className="form-field-group">
                <label htmlFor="objectives">Specific Objectives *</label>
                <textarea
                  id="objectives"
                  name="objectives"
                  rows="3"
                  className={errors.objectives ? 'input-error' : ''}
                  value={formData.objectives}
                  onChange={handleChange}
                  placeholder="Enumerate concrete objectives (e.g. 1. Design, 2. Build, 3. Validate)"
                ></textarea>
                {errors.objectives && (
                  <span className="field-err">{errors.objectives}</span>
                )}
              </div>

              <div className="form-field-group">
                <label htmlFor="expectedOutcome">Expected Outcome / Impact *</label>
                <textarea
                  id="expectedOutcome"
                  name="expectedOutcome"
                  rows="3"
                  className={errors.expectedOutcome ? 'input-error' : ''}
                  value={formData.expectedOutcome}
                  onChange={handleChange}
                  placeholder="Describe the final artifact, software release, or research evaluation"
                ></textarea>
                {errors.expectedOutcome && (
                  <span className="field-err">{errors.expectedOutcome}</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="form-actions-bar">
                <button
                  type="button"
                  className="btn-save-draft"
                  onClick={handleSaveDraft}
                >
                  Save Draft
                </button>
                <button type="submit" className="btn-submit-proposal">
                  Submit Proposal for Review
                </button>
              </div>
            </form>
          </div>

          {/* Proposal Guidelines & Status Card */}
          <div className="proposal-side-col">
            <div className="card status-summary-card">
              <div className="card-header">
                <h3 className="card-title">Proposal Status</h3>
              </div>
              <div className="status-timeline">
                <div className="timeline-step step-done">
                  <div className="step-circle">✓</div>
                  <div className="step-info">
                    <strong>1. Student Draft</strong>
                    <span>Completed by Team Lead</span>
                  </div>
                </div>
                <div className="timeline-step step-current">
                  <div className="step-circle">2</div>
                  <div className="step-info">
                    <strong>2. Guide Review</strong>
                    <span>Awaiting approval from Dr. Sharma</span>
                  </div>
                </div>
                <div className="timeline-step step-pending">
                  <div className="step-circle">3</div>
                  <div className="step-info">
                    <strong>3. Coordinator Approval</strong>
                    <span>Department Project Committee</span>
                  </div>
                </div>
              </div>

              <div className="coordinator-notice">
                <strong>Important Notice:</strong> Final date for guide proposal
                endorsement is <em>Nov 10, 2026</em>. Re-submissions are allowed up to
                2 iterations.
              </div>
            </div>

            <div className="card guidelines-card">
              <div className="card-header">
                <h3 className="card-title">Submission Guidelines</h3>
              </div>
              <ul className="guidelines-list">
                <li>Titles must be clear and specific to the engineering problem.</li>
                <li>At least 3 measurable objectives are mandatory.</li>
                <li>Both hardware and software specifications must be feasible in 2 semesters.</li>
                <li>Check with your guide before selecting specialized hardware kits.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

export default Proposal;
