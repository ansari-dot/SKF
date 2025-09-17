import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import OurWorkPage from './pages/OurWorkPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import MediaPage from './pages/MediaPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';

// Admin components
import AdminLayout from './Admin/AdminLayout';
import Dashboard from './Admin/Dashboard';
import GetInvolved from './Admin/GetInvolved';
import Project from './Admin/Project';
import Program from './Admin/Program';
import Opportunity from './Admin/Opportunity';
import Media from './Admin/Media';
import Contact from './Admin/Contact';
import UserProfile from './Admin/UserProfile';
import FeaturedEvent from './Admin/FeaturedEvent';
import './styles/global.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        {isLoading && <Preloader />}
        <div className="App" style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute adminOnly={true} />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="get-involved" element={<GetInvolved />} />
                <Route path="projects" element={<Project />} />
                <Route path="programs" element={<Program />} />
                <Route path="opportunities" element={<Opportunity />} />
                <Route path="media" element={<Media />} />
                <Route path="contact" element={<Contact />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="featured-events" element={<FeaturedEvent />} />
              </Route>
            </Route> {/* ✅ Closed admin route properly */}

            {/* Public Routes */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <main>
                    <HomePage />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Header />
                  <main>
                    <AboutPage />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/our-work"
              element={
                <>
                  <Header />
                  <main>
                    <OurWorkPage />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/get-involved"
              element={
                <>
                  <Header />
                  <main>
                    <GetInvolvedPage />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/media"
              element={
                <>
                  <Header />
                  <main>
                    <MediaPage />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Header />
                  <main>
                    <ContactPage />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/login/admin"
              element={
                <>
                  <main>
                    <LoginPage />
                  </main>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
