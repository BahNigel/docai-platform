import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landingPage/Index';
import HomePage from '../pages/homePage/Index';
import DocumentsPage from '../pages/documentPage/DocumentsPage';
import ChatRoomPage from '../pages/chatRoomPage/ChatRoomPage';
import AnalyticsPage from '../pages/analyticsPage/AnalyticsPage';
import SettingsPage from '../pages/settingsPage/SettingsPage';
import ViewDocumentPage from '../pages/documentPage/ViewDocumentPage';
import AuthPage from '../pages/authPage/AuthPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/documents" element={<DocumentsPage />} />
      <Route path="/chat" element={<ChatRoomPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/documents/view" element={<ViewDocumentPage />} />
      <Route path="/auth" element={<AuthPage />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}
