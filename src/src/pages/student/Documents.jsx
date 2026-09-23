import React, { useState } from 'react';
import StudentLayout from '../../components/layout/StudentLayout';
import './Documents.css';

/**
 * Documents Component
 * Route: /student/documents
 */
function Documents() {
  const [documents, setDocuments] = useState([
    {
      id: 'doc-1',
      name: 'AcadPredict_Project_Abstract_Approved.pdf',
      type: 'PDF Document',
      size: '1.2 MB',
      uploadedBy: 'Student User',
      uploadDate: 'Sep 14, 2026',
      status: 'Approved',
      version: 'v1.1',
    },
    {
      id: 'doc-2',
      name: 'System_Requirements_Specification_Draft.docx',
      type: 'Word Document',
      size: '4.8 MB',
      uploadedBy: 'Alex Rivera',
      uploadDate: 'Oct 08, 2026',
      status: 'Pending Review',
      version: 'v0.9',
    },
    {
      id: 'doc-3',
      name: 'System_Architecture_And_UML_Diagrams.pdf',
      type: 'PDF Document',
      size: '2.5 MB',
      uploadedBy: 'Student User',
      uploadDate: 'Oct 12, 2026',
      status: 'Pending Review',
      version: 'v1.0',
    },
    {
      id: 'doc-4',
      name: 'Literature_Survey_IEEE_Summary.pdf',
      type: 'PDF Document',
      size: '3.1 MB',
      uploadedBy: 'Priya Sharma',
      uploadDate: 'Oct 15, 2026',
      status: 'Draft',
      version: 'v0.4',
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('PDF Document');
  const [notification, setNotification] = useState(null);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!docTitle) {
        setDocTitle(file.name);
      }
      if (file.name.endsWith('.pdf')) setDocCategory('PDF Document');
      else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) setDocCategory('Word Document');
      else if (file.name.endsWith('.pptx') || file.name.endsWith('.ppt')) setDocCategory('Presentation');
      else setDocCategory('Project File');
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!docTitle.trim()) {
      alert('Please enter a document title or select a file.');
      return;
    }

    const newDoc = {
      id: `doc-${Date.now()}`,
      name: docTitle.includes('.') ? docTitle : `${docTitle}.pdf`,
      type: docCategory,
      size: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
      uploadedBy: 'Student User',
      uploadDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Pending Review',
      version: 'v1.0',
    };

    setDocuments([newDoc, ...documents]);
    setShowUploadModal(false);
    setSelectedFile(null);
    setDocTitle('');
    setNotification(`"${newDoc.name}" uploaded successfully for evaluation!`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDownload = (docName) => {
    setNotification(`Download started for: ${docName}`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDelete = (docId, docName) => {
    const confirmDelete = window.confirm(`Delete document "${docName}" from workspace?`);
    if (confirmDelete) {
      setDocuments(documents.filter((d) => d.id !== docId));
      setNotification(`"${docName}" was removed.`);
      setTimeout(() => setNotification(null), 3500);
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'status-completed';
      case 'pending review':
        return 'status-progress';
      case 'draft':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <StudentLayout pageTitle="Documents">
      <div className="documents-page">
        {/* Header */}
        <div className="documents-header-row">
          <div>
            <h1 className="documents-title">Project Documents</h1>
            <p className="documents-subtitle">
              Upload deliverables, access evaluation guidelines, and archive project reports.
            </p>
          </div>

          <button
            type="button"
            className="btn-upload-document"
            onClick={() => setShowUploadModal(true)}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Upload Document</span>
          </button>
        </div>

        {/* Alert Notification */}
        {notification && (
          <div className="alert-banner alert-success">
            <span>✓ {notification}</span>
          </div>
        )}

        {/* Documents Table Card */}
        <div className="card documents-table-card">
          <div className="table-responsive">
            <table className="documents-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Type</th>
                  <th>Uploaded By</th>
                  <th>Upload Date</th>
                  <th>Status</th>
                  <th className="actions-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="doc-name-cell">
                      <div className="doc-title-box">
                        <span className="doc-file-icon">📄</span>
                        <div className="doc-meta-text">
                          <span className="doc-name">{doc.name}</span>
                          <span className="doc-submeta">
                            {doc.size} &bull; {doc.version}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="doc-type-badge">{doc.type}</span>
                    </td>
                    <td className="doc-author-cell">{doc.uploadedBy}</td>
                    <td className="doc-date-cell">{doc.uploadDate}</td>
                    <td>
                      <span className={`status-pill ${getStatusClass(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <div className="action-buttons-wrap">
                        <button
                          type="button"
                          className="btn-action-download"
                          onClick={() => handleDownload(doc.name)}
                          title="Download document"
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Download</span>
                        </button>
                        <button
                          type="button"
                          className="btn-action-delete"
                          onClick={() => handleDelete(doc.id, doc.name)}
                          title="Delete document"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Upload Document */}
        {showUploadModal && (
          <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
            <div className="modal-dialog modal-form" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>Upload Project Deliverable</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowUploadModal(false)}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleUploadSubmit} className="modal-form-body">
                <div className="file-drop-area">
                  <input
                    type="file"
                    id="fileUploadInput"
                    className="native-file-input"
                    onChange={handleFileSelect}
                  />
                  <label htmlFor="fileUploadInput" className="file-drop-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="drop-icon">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>
                      {selectedFile ? selectedFile.name : 'Click or browse to choose a file'}
                    </span>
                    <span className="drop-subtext">PDF, DOCX, PPTX up to 25MB</span>
                  </label>
                </div>

                <div className="form-group-item">
                  <label>Document Display Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SRS_Document_Final_v1.0.pdf"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                  />
                </div>

                <div className="form-group-item">
                  <label>Document Classification</label>
                  <select
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value)}
                  >
                    <option value="PDF Document">PDF Document</option>
                    <option value="Word Document">Word Document</option>
                    <option value="Presentation">Presentation (PPTX)</option>
                    <option value="Source Archive">Code Archive (ZIP)</option>
                  </select>
                </div>

                <div className="modal-foot-actions">
                  <button
                    type="button"
                    className="btn-secondary-btn"
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary-submit">
                    Upload to Repository
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

export default Documents;
