import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

/**
 * Register Placeholder Component
 * Informs students & faculty that self-registration is coming soon
 */
function Register() {
  const navigate = useNavigate();

  return (
    <div className="register-page">
      <div className="register-card">
        {/* Brand Logo */}
        <div className="register-header">
          <div className="register-logo-wrap">
            <svg
              className="register-brand-icon"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="32" height="32" rx="8" fill="#1E40AF" />
              <path
                d="M16 7L6 12L16 17L26 12L16 7Z"
                fill="#93C5FD"
                stroke="#DBEAFE"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M10 14.5V20C10 22.5 12.5 24.5 16 24.5C19.5 24.5 22 22.5 22 20V14.5"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26 13V19"
                stroke="#FCD34D"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="register-brand-name">
              Acad<span className="register-brand-highlight">Predict</span>
            </span>
          </div>

          <div className="register-badge">Account Registration</div>
          <h1 className="register-title">Student &amp; Faculty Registration</h1>
          <p className="register-subtitle">
            Academic Project Collaboration &amp; Risk Prediction Platform
          </p>
        </div>

        {/* Coming Soon Notice Card */}
        <div className="register-notice-box">
          <div className="notice-icon-circle">
            <svg
              className="notice-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2 className="notice-heading">Registration Coming Soon</h2>
          <p className="notice-text">
            Self-registration will be open once batch allocations are finalized.
            Currently, accounts are provisioned directly by academic coordinators.
          </p>
          <div className="notice-instructions">
            <p><strong>Students:</strong> Check with your college project coordinator for login credentials.</p>
            <p><strong>Faculty:</strong> Contact the CSE Department Head for faculty access.</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="btn-back-login"
          onClick={() => navigate('/login')}
        >
          &larr; Back to Login
        </button>

        <div className="register-footer-note">
          <span>AcadPredict • Academic Collaboration Portal</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
