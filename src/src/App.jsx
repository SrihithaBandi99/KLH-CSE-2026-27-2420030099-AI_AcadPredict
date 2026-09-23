import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/student/StudentDashboard';
import MyProjects from './pages/student/MyProjects';
import Proposal from './pages/student/Proposal';
import MyTeam from './pages/student/MyTeam';
import Tasks from './pages/student/Tasks';
import Milestones from './pages/student/Milestones';
import Documents from './pages/student/Documents';
import RiskPrediction from './pages/student/RiskPrediction';
import Notifications from './pages/student/Notifications';

/**
 * AcadPredict Application Root
 * Student Portal Routes & Authentication
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Portal Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/projects" element={<MyProjects />} />
        <Route path="/student/proposal" element={<Proposal />} />
        <Route path="/student/team" element={<MyTeam />} />
        <Route path="/student/tasks" element={<Tasks />} />
        <Route path="/student/milestones" element={<Milestones />} />
        <Route path="/student/documents" element={<Documents />} />
        <Route path="/student/risk" element={<RiskPrediction />} />
        <Route path="/student/notifications" element={<Notifications />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
