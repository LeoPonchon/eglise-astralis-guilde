import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import About from "@/components/About";
import Builds from "@/components/Builds";
import Guides from "@/components/Guides";
import Recruitment from "@/components/Recruitment";
import NotFound from "./pages/NotFound";
import ClassPage from "./pages/ClassPage";
import CalendarPage from "./pages/CalendarPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === "fadeOut") {
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("fadeIn");
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [transitionStage, location]);

  return (
    <div className={`page-transition ${transitionStage}`}>
      <Routes location={displayLocation} key={displayLocation.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/builds" element={<Layout><Builds /></Layout>} />
        <Route path="/builds/:slug" element={<ClassPage />} />
        <Route path="/guides" element={<Layout><Guides /></Layout>} />
        <Route path="/recruitment" element={<Layout><Recruitment /></Layout>} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <LanguageProvider>
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  </LanguageProvider>
);

export default App;
