import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Category from './pages/Category';
import Projects from './pages/Projects';
import Stack from './pages/Stack';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Editor from './pages/admin/Editor';
import MediaLibrary from './pages/admin/MediaLibrary';
import PostDetail from './pages/PostDetail';
import SommelierDigital from './pages/SommelierDigital';
import SitgesArt from './pages/SitgesArt';
import SitgesWalk from './pages/SitgesWalk';
import FetsPerSitges from './pages/FetsPerSitges';
import LegalNotice from './pages/LegalNotice';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TalComErem from './pages/TalComErem';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Sync the HTML lang attribute with the current i18n language
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="stack" element={<Stack />} />
            <Route path="category/:slug" element={<Category />} />
            <Route path="contact" element={<Contact />} />
            <Route path="post/:id" element={<PostDetail />} />
            <Route path="projects/sommelier" element={<SommelierDigital />} />
            <Route path="projects/sitges-art" element={<SitgesArt />} />
            <Route path="projects/sitges-walk" element={<SitgesWalk />} />
            <Route path="projects/fets-per-sitges" element={<FetsPerSitges />} />
            <Route path="projects/tal-com-erem" element={<TalComErem />} />
            <Route path="avis-legal" element={<LegalNotice />} />
            <Route path="politica-cookies" element={<CookiePolicy />} />
            <Route path="politica-privacitat" element={<PrivacyPolicy />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/media"
            element={
              <ProtectedRoute>
                <MediaLibrary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/new"
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
