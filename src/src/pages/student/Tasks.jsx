import React, { useState } from 'react';
import StudentLayout from '../../components/layout/StudentLayout';
import './Tasks.css';

/**
 * Tasks Component
 * Route: /student/tasks
 */
function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: 'task-101',
      title: 'Implement Student Dashboard UI & Navigation',
      description: 'Build responsive layout with sidebar, summary cards, and client-side routing.',
      assignedTo: 'Student User',
      dueDate: '2026-10-24',
      priority: 'High',
      status: 'In Progress',
      progress: 85,
    },
    {
      id: 'task-102',
      title: 'Finalize Risk Prediction Dataset Preprocessing',
      description: 'Clean academic student commit history and normalize feature vectors for ML model.',
      assignedTo: 'Alex Rivera',
      dueDate: '2026-10-29',
      priority: 'High',
      status: 'Pending',
      progress: 30,
    },
    {
      id: 'task-103',
      title: 'Draft Literature Survey Chapter for SRS',
      description: 'Summarize 12 IEEE/ACM papers on academic outcome forecasting systems.',
      assignedTo: 'Student User',
      dueDate: '2026-11-03',
      priority: 'Medium',
      status: 'Pending',
      progress: 45,
    },
    {
      id: 'task-104',
      title: 'Sync API Contract with Backend Team',
      description: 'Define REST request/response schemas for student project endpoints.',
      assignedTo: 'Priya Sharma',
      dueDate: '2026-11-07',
      priority: 'Low',
      status: 'Pending',
      progress: 10,
    },
    {
      id: 'task-105',
      title: 'Database Schema & ER Diagrams for AcadPredict',
      description: 'Complete Relational Schema for Users, Teams, Milestones, and Risk Indices.',
      assignedTo: 'David Chen',
      dueDate: '2026-10-15',
      priority: 'Medium',
      status: 'Completed',
      progress: 100,
    },
  ]);

  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: 'Student User',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
    progress: 0,
  });

  const teamMembers = ['Student User', 'Alex Rivera', 'Priya Sharma', 'David Chen'];

  const filteredTasks = tasks.filter((task) => {
    const matchStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    return matchStatus && matchPriority;
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.dueDate) {
      alert('Please fill out the task title and due date.');
      return;
    }

    const created = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description || 'Task assigned to project team member.',
      assignedTo: newTask.assignedTo,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      status: newTask.status,
      progress: Number(newTask.progress) || 0,
    };

    setTasks([created, ...tasks]);
    setShowAddModal(false);
    setNewTask({
      title: '',
      description: '',
      assignedTo: 'Student User',
      dueDate: '',
      priority: 'Medium',
      status: 'Pending',
      progress: 0,
    });
    setNotification('Task added successfully!');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: newStatus,
              progress: newStatus === 'Completed' ? 100 : t.progress,
            }
          : t
      )
    );
  };

  const getPriorityClass = (priority) => {
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

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'in progress':
        return 'status-progress';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <StudentLayout pageTitle="Tasks">
      <div className="tasks-page">
        {/* Top Header Row */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Sprint Tasks</h1>
            <p className="tasks-subtitle">
              Manage work packages, allocate assignments, and monitor completion progress.
            </p>
          </div>

          <button
            type="button"
            className="btn-add-task"
            onClick={() => setShowAddModal(true)}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Add Task</span>
          </button>
        </div>

        {/* Alert Notification */}
        {notification && (
          <div className="alert-banner alert-success">
            <span>✓ {notification}</span>
          </div>
        )}

        {/* Filters Row */}
        <div className="card filters-card">
          <div className="filters-row">
            <div className="filter-group">
              <label>Filter by Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses ({tasks.length})</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Filter by Priority:</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="filter-stats">
              Showing <strong>{filteredTasks.length}</strong> tasks
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="tasks-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className="card task-card-item">
              <div className="task-card-main">
                <div className="task-header-line">
                  <span className={`priority-pill ${getPriorityClass(task.priority)}`}>
                    {task.priority} Priority
                  </span>
                  <span className="task-due-date">Due: {task.dueDate}</span>
                </div>

                <h3 className="task-title-text">{task.title}</h3>
                <p className="task-description-text">{task.description}</p>

                <div className="task-meta-footer">
                  <div className="task-assignee">
                    <span className="assignee-label">Assigned:</span>
                    <span className="assignee-name">{task.assignedTo}</span>
                  </div>

                  {/* Progress Slider / Bar */}
                  <div className="task-progress-box">
                    <div className="progress-bar-label">
                      <span>Progress</span>
                      <strong>{task.progress}%</strong>
                    </div>
                    <div className="task-progress-track">
                      <div
                        className="task-progress-fill"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Quick status selector */}
                  <div className="task-status-control">
                    <select
                      className={`status-dropdown ${getStatusClass(task.status)}`}
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="empty-tasks-card card">
              <p>No tasks match the selected filters.</p>
              <button
                type="button"
                className="btn-clear-filters"
                onClick={() => {
                  setStatusFilter('All');
                  setPriorityFilter('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Modal: Add Task */}
        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal-dialog modal-form" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>Create New Task</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleAddTask} className="modal-form-body">
                <div className="form-group-item">
                  <label>Task Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Conduct pilot user tests for portal"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>

                <div className="form-group-item">
                  <label>Description</label>
                  <textarea
                    rows="2"
                    placeholder="Brief description of requirements..."
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="form-row-two">
                  <div className="form-group-item">
                    <label>Assigned Member</label>
                    <select
                      value={newTask.assignedTo}
                      onChange={(e) =>
                        setNewTask({ ...newTask, assignedTo: e.target.value })
                      }
                    >
                      {teamMembers.map((m, idx) => (
                        <option key={idx} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group-item">
                    <label>Due Date *</label>
                    <input
                      type="date"
                      required
                      value={newTask.dueDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, dueDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-group-item">
                    <label>Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) =>
                        setNewTask({ ...newTask, priority: e.target.value })
                      }
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="form-group-item">
                    <label>Initial Status</label>
                    <select
                      value={newTask.status}
                      onChange={(e) =>
                        setNewTask({ ...newTask, status: e.target.value })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="modal-foot-actions">
                  <button
                    type="button"
                    className="btn-secondary-btn"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary-submit">
                    Add Task
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

export default Tasks;
