import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Category from './pages/Category';
import Projects from './pages/Projects';
import Stack from './pages/Stack';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Editor from './pages/admin/Editor';
import PostDetail from './pages/PostDetail';
import SommelierDigital from './pages/SommelierDigital';
import SitgesArt from './pages/SitgesArt';
import SitgesWalk from './pages/SitgesWalk';
import LegalNotice from './pages/LegalNotice';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <AuthProvider>
      <Router>
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
