import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

/**
 * Login Component for AcadPredict
 * Academic Project Collaboration & Risk Prediction Platform
 */
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error' | 'info', text: '' }

  // Input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear validation error when user begins typing in that field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (statusMessage) {
      setStatusMessage(null);
    }
  };

  // Field validation
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@college.edu).';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    return newErrors;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear any previous errors
    setErrors({});
    setIsLoading(true);

    // Show temporary authenticating state, then navigate to Student Dashboard
    setTimeout(() => {
      setIsLoading(false);
      navigate('/student/dashboard');
    }, 600);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setStatusMessage({
      type: 'info',
      text: 'Password reset instructions have been simulated. Contact your department coordinator if locked out.',
    });
  };

  const handleRegisterRedirect = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-card-container">
        {/* Top Branding & Badge */}
        <div className="login-header">
          <div className="brand-logo-wrap">
            <svg
              className="brand-icon"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Graduation Cap / Academic Predictive Shield Emblem */}
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
            <span className="brand-name">
              Acad<span className="brand-name-highlight">Predict</span>
            </span>
          </div>

          <div className="portal-badge">Academic Portal</div>

          <h1 className="login-title">Welcome to AcadPredict</h1>
          <p className="login-subtitle">
            Academic Project Collaboration &amp; Risk Prediction Platform
          </p>

          <div className="role-tags">
            <span className="role-tag">Students</span>
            <span className="role-dot">•</span>
            <span className="role-tag">Faculty</span>
            <span className="role-dot">•</span>
            <span className="role-tag">Coordinators</span>
          </div>
        </div>

        {/* Global Notification / Alert Banner */}
        {statusMessage && (
          <div
            className={`login-alert login-alert-${statusMessage.type}`}
            role="alert"
          >
            {statusMessage.type === 'success' && (
              <svg className="alert-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {statusMessage.type === 'error' && (
              <svg className="alert-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {statusMessage.type === 'info' && (
              <svg className="alert-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Institutional / University Email
            </label>
            <div className={`input-wrapper ${errors.email ? 'input-error' : ''}`}>
              <svg
                className="input-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <input
                id="email"
                type="email"
                name="email"
                className="form-input"
                placeholder="student@college.edu or faculty@college.edu"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="email"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            {errors.email && (
              <span id="email-error" className="field-error">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <a
                href="#forgot-password"
                className="forgot-link"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </a>
            </div>
            <div className={`input-wrapper ${errors.password ? 'input-error' : ''}`}>
              <svg
                className="input-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input password-input"
                placeholder="Enter your account password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="current-password"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
                tabIndex={0}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  /* Eye-off icon */
                  <svg
                    className="toggle-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                ) : (
                  /* Eye icon */
                  <svg
                    className="toggle-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="field-error">
                {errors.password}
              </span>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="form-remember-row">
            <label className="checkbox-label" htmlFor="rememberMe">
              <input
                id="rememberMe"
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Remember me on this device</span>
            </label>
          </div>

          {/* Submit Button with Loading State */}
          <button
            type="submit"
            className={`btn-primary ${isLoading ? 'btn-loading' : ''}`}
            disabled={isLoading}
            id="login-submit-btn"
          >
            {isLoading ? (
              <span className="btn-content">
                <svg
                  className="btn-spinner"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="60"
                    strokeDashoffset="20"
                  />
                </svg>
                <span>Authenticating...</span>
              </span>
            ) : (
              <span className="btn-content">
                <span>Sign In to Dashboard</span>
                <svg
                  className="btn-arrow-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </button>
        </form>

        {/* Footer / Registration Link */}
        <div className="login-footer">
          <p className="register-text">
            Don&apos;t have an account?{' '}
            <a
              href="#register"
              className="register-link"
              onClick={handleRegisterRedirect}
            >
              Request Access / Register
            </a>
          </p>
        </div>

        {/* System Notice for College Project */}
        <div className="project-note">
          <span>AcadPredict • Academic Project &amp; Risk Analytics</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
