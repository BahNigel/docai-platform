import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingPage/Index";
import HomePage from "../pages/homePage/Index";
import DocumentsPage from "../pages/documentPage/DocumentsPage";
import ChatRoomPage from "../pages/chatRoomPage/ChatRoomPage";
import AnalyticsPage from "../pages/analyticsPage/AnalyticsPage";

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/chat" element={<ChatRoomPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        {/* Add other routes as needed */}
    </Routes>
  );
}
