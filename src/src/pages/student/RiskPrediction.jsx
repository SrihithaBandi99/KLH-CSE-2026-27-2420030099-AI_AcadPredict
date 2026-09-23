import React, { useState } from 'react';
import StudentLayout from '../../components/layout/StudentLayout';
import './RiskPrediction.css';

/**
 * RiskPrediction Component
 * Route: /student/risk
 */
function RiskPrediction() {
  const [showDetailedModal, setShowDetailedModal] = useState(false);

  // Mock Predictive Risk Analytics Data
  const riskData = {
    riskLevel: 'Medium',
    riskScore: 52,
    maxScore: 100,
    riskCategory: 'Schedule & Submission Delay Risk',
    lastPredictionDate: 'Oct 18, 2026, 09:30 AM',
    modelConfidence: '88.4%',
    modelVersion: 'AcadPredict-Ensemble-v2.3 (Mock Engine)',
    insight:
      'The AcadPredict risk prediction model has assessed your project telemetry. Based on sprint velocity, 2 pending deliverables approaching the SRS milestone window, and mentor feedback cadence, a moderate timeline delay probability has been flagged.',
    factors: [
      {
        id: 'f-1',
        name: 'Task Completion Rate',
        status: 'Warning',
        value: '58% of sprint tasks closed on schedule',
        impact: 'Moderate negative impact (+14 risk points)',
      },
      {
        id: 'f-2',
        name: 'Milestone Proximity',
        status: 'Warning',
        value: '8 days remaining before Phase 2 SRS review',
        impact: 'High sensitivity (+22 risk points)',
      },
      {
        id: 'f-3',
        name: 'Repository Commit Cadence',
        status: 'Good',
        value: 'Regular frontend commits logged this week',
        impact: 'Positive mitigation (-10 risk points)',
      },
      {
        id: 'f-4',
        name: 'Guide Sync & Feedback',
        status: 'Neutral',
        value: 'Last review completed 4 days ago',
        impact: 'Stable (+4 risk points)',
      },
    ],
    recommendedActions: [
      {
        priority: 'High Priority',
        title: 'Submit Chapter 2 Literature Survey',
        desc: 'Finish draft review with Dr. Sharma before Oct 28 to unlock SRS approval.',
      },
      {
        priority: 'High Priority',
        title: 'Accelerate Preprocessing Dataset Sprint',
        desc: 'Reallocate team member Alex Rivera to support feature extraction backlog.',
      },
      {
        priority: 'Medium Priority',
        title: 'Schedule Guide Progress Checkpoint',
        desc: 'Request a 15-minute clarification meeting regarding architectural diagrams.',
      },
    ],
  };

  return (
    <StudentLayout pageTitle="Risk Prediction">
      <div className="risk-page">
        {/* Page Header */}
        <div className="risk-header-row">
          <div>
            <h1 className="risk-page-title">Risk Prediction &amp; Analytics</h1>
            <p className="risk-page-subtitle">
              Machine learning risk assessment engine forecasting project delay probabilities.
            </p>
          </div>

          <div className="prediction-time-pill">
            <span>Last Evaluated: <strong>{riskData.lastPredictionDate}</strong></span>
          </div>
        </div>

        {/* Top Summary Metric Cards */}
        <div className="risk-metrics-grid">
          {/* Main Risk Gauge Card */}
          <div className="card risk-score-hero-card">
            <span className="hero-card-label">Predicted Risk Level</span>
            <div className="hero-badge-wrap">
              <span className="risk-badge-big badge-medium">
                {riskData.riskLevel} Risk
              </span>
            </div>

            <div className="risk-numeric-display">
              <span className="score-big">{riskData.riskScore}</span>
              <span className="score-max">/ {riskData.maxScore}</span>
            </div>

            <p className="risk-category-caption">{riskData.riskCategory}</p>

            {/* Gauge progress bar */}
            <div className="gauge-track">
              <div
                className="gauge-fill gauge-amber"
                style={{ width: `${riskData.riskScore}%` }}
              ></div>
            </div>

            <div className="gauge-scale-labels">
              <span>0 (Low)</span>
              <span>40 (Medium)</span>
              <span>75 (Critical)</span>
            </div>
          </div>

          {/* Model Meta Card */}
          <div className="card model-meta-card">
            <h3 className="model-meta-title">Prediction Diagnostics</h3>
            <div className="diagnostics-list">
              <div className="diag-item">
                <span className="diag-key">Model Algorithm:</span>
                <span className="diag-val">{riskData.modelVersion}</span>
              </div>
              <div className="diag-item">
                <span className="diag-key">Confidence Score:</span>
                <span className="diag-val confidence-good">{riskData.modelConfidence}</span>
              </div>
              <div className="diag-item">
                <span className="diag-key">Sprint Telemetry:</span>
                <span className="diag-val">Analyzed 18 historical milestones</span>
              </div>
              <div className="diag-item">
                <span className="diag-key">Alert Status:</span>
                <span className="diag-val alert-amber-text">Advisory Notice</span>
              </div>
            </div>

            <button
              type="button"
              className="btn-view-detailed-risk"
              onClick={() => setShowDetailedModal(true)}
            >
              View Detailed Risk Breakdown &rarr;
            </button>
          </div>
        </div>

        {/* Predictive Insight Box */}
        <div className="card insight-card">
          <div className="insight-card-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="insight-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <h3>Predictive Rationale &amp; Synthesis</h3>
          </div>
          <p className="insight-body-text">{riskData.insight}</p>
        </div>

        {/* Bottom Two-Column: Factors & Recommended Actions */}
        <div className="risk-two-column">
          {/* Factor Breakdown */}
          <div className="card factors-card">
            <div className="card-header">
              <h3 className="card-title">Contributing Risk Factors</h3>
            </div>
            <div className="factors-table">
              {riskData.factors.map((factor) => (
                <div key={factor.id} className="factor-row-item">
                  <div className="factor-left">
                    <span
                      className={`factor-status-dot ${
                        factor.status === 'Warning'
                          ? 'dot-warning'
                          : factor.status === 'Good'
                          ? 'dot-good'
                          : 'dot-neutral'
                      }`}
                    ></span>
                    <div>
                      <h4 className="factor-name">{factor.name}</h4>
                      <p className="factor-value">{factor.value}</p>
                    </div>
                  </div>
                  <span className="factor-impact-tag">{factor.impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="card actions-card">
            <div className="card-header">
              <h3 className="card-title">Mitigation &amp; Recommended Actions</h3>
            </div>
            <div className="actions-list">
              {riskData.recommendedActions.map((act, idx) => (
                <div key={idx} className="action-step-item">
                  <div className="action-step-top">
                    <span
                      className={`action-priority-tag ${
                        act.priority.includes('High') ? 'priority-high-tag' : 'priority-med-tag'
                      }`}
                    >
                      {act.priority}
                    </span>
                  </div>
                  <h4 className="action-step-title">{act.title}</h4>
                  <p className="action-step-desc">{act.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal: Detailed Risk Information */}
        {showDetailedModal && (
          <div className="modal-overlay" onClick={() => setShowDetailedModal(false)}>
            <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>Detailed Risk Index Analysis</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDetailedModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-content-body">
                <div className="detailed-modal-score-box">
                  <span className="badge-medium risk-modal-badge">
                    Current Risk Score: 52 / 100 (Medium)
                  </span>
                  <p>
                    The prediction index represents a normalized aggregate of sprint velocity,
                    deliverable turnaround time, and milestone proximity.
                  </p>
                </div>

                <div className="modal-weights-table">
                  <h5>Feature Weights in AcadPredict Random Forest Engine:</h5>
                  <ul>
                    <li><strong>Milestone Proximity Index:</strong> 35% overall weighting</li>
                    <li><strong>Task Completion Backlog:</strong> 25% overall weighting</li>
                    <li><strong>Git Commit &amp; Code Delta Cadence:</strong> 20% overall weighting</li>
                    <li><strong>Guide Review Delay:</strong> 20% overall weighting</li>
                  </ul>
                </div>
                <p className="modal-disclaimer">
                  * Note: Predictive calculations are simulated based on mock engineering deliverables for evaluation demo.
                </p>
              </div>
              <div className="modal-foot">
                <button
                  type="button"
                  className="btn-secondary-btn"
                  onClick={() => setShowDetailedModal(false)}
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

export default RiskPrediction;
