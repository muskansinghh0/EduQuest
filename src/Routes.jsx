import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ContentManagement from './pages/content-management';
import ProgressTracking from './pages/progress-tracking';
import QuizAssessment from './pages/quiz-assessment';
import LessonContent from './pages/lesson-content';
import StudentDashboard from './pages/student-dashboard';
import TeacherDashboard from './pages/teacher-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ContentManagement />} />
        <Route path="/content-management" element={<ContentManagement />} />
        <Route path="/progress-tracking" element={<ProgressTracking />} />
        <Route path="/quiz-assessment" element={<QuizAssessment />} />
        <Route path="/lesson-content" element={<LessonContent />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
