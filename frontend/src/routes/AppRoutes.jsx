import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/landingPage/Index';
import HomePage from '../pages/homePage/Index';
import DocumentsPage from '../pages/documentPage/DocumentsPage';
import ChatRoomPage from '../pages/chatRoomPage/ChatRoomPage';
import AnalyticsPage from '../pages/analyticsPage/AnalyticsPage';
import SettingsPage from '../pages/settingsPage/SettingsPage';
import ViewDocumentPage from '../pages/documentPage/ViewDocumentPage';
import AuthPage from '../pages/authPage/AuthPage';
import { isAuthenticated } from '../utils/auth';

// Wrapper for protected routes
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Not logged in: redirect to landing
    return <Navigate to="/" replace />;
  }
  // Logged in: show the requested page
  return children;
};

// Wrapper for public routes only accessible when NOT logged in
const PublicOnlyRoute = ({ children }) => {
  if (isAuthenticated()) {
    // Logged in users can access these pages anyway, so redirect to home or allow access
    // Here, we'll allow access to landing/auth pages also for logged-in users
    return children;
  }
  // Not logged in: allow access
  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Landing Page: accessible to all */}
      <Route
        path="/"
        element={
          <PublicOnlyRoute>
            <LandingPage />
          </PublicOnlyRoute>
        }
      />

      {/* Auth Page: accessible to all */}
      <Route
        path="/auth"
        element={
          <PublicOnlyRoute>
            <AuthPage />
          </PublicOnlyRoute>
        }
      />

      {/* Protected routes: only if logged in */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <DocumentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/view"
        element={
          <ProtectedRoute>
            <ViewDocumentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatRoomPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all: if not matched, redirect based on auth */}
      <Route
        path="*"
        element={
          isAuthenticated() ? (
            <Navigate to="/" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}
