import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const OurWorkPage = lazy(() => import('./pages/OurWorkPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const GetInvolvedPage = lazy(() => import('./pages/GetInvolvedPage'));
const MediaPage = lazy(() => import('./pages/MediaPage'));
const MediaDetailPage = lazy(() => import('./pages/MediaDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

// Create a loading component for Suspense fallback
const Loader = () => <LoadingSpinner size={50} text="Loading page..." />;

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
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <ToastContainer 
            position="top-right" 
            autoClose={5000} 
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{
              marginTop: '70px',
              zIndex: 9999
            }}
          />

          <Routes>
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRoute adminOnly={true}>
                    <AdminLayout />
                  </ProtectedRoute>
                </Suspense>
              }
            >
              <Route 
                index 
                element={
                  <Suspense fallback={<Loader />}>
                    <Dashboard />
                  </Suspense>
                } 
              />
              <Route 
                path="dashboard" 
                element={
                  <Suspense fallback={<Loader />}>
                    <Dashboard />
                  </Suspense>
                } 
              />
              <Route 
                path="get-involved" 
                element={
                  <Suspense fallback={<Loader />}>
                    <GetInvolved />
                  </Suspense>
                } 
              />
              <Route 
                path="projects" 
                element={
                  <Suspense fallback={<Loader />}>
                    <Project />
                  </Suspense>
                } 
              />
              <Route 
                path="programs" 
                element={
                  <Suspense fallback={<Loader />}>
                    <Program />
                  </Suspense>
                } 
              />
              <Route 
                path="featured-event" 
                element={
                  <Suspense fallback={<Loader />}>
                    <FeaturedEvent />
                  </Suspense>
                } 
              />
              <Route 
                path="media" 
                element={
                  <Suspense fallback={<Loader />}>
                    <Media />
                  </Suspense>
                } 
              />
              <Route 
                path="contact" 
                element={
                  <Suspense fallback={<Loader />}>
                    <Contact />
                  </Suspense>
                } 
              />
              <Route 
                path="profile" 
                element={
                  <Suspense fallback={<Loader />}>
                    <UserProfile />
                  </Suspense>
                } 
              />
            </Route>

            {/* Public Routes */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <main>
                    <Suspense fallback={<LoadingSpinner />}>
                      <HomePage />
                    </Suspense>
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
                    <Suspense fallback={<LoadingSpinner />}>
                      <AboutPage />
                    </Suspense>
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
                    <Suspense fallback={<LoadingSpinner />}>
                      <OurWorkPage />
                    </Suspense>
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <>
                  <Header />
                  <main>
                    <Suspense fallback={<LoadingSpinner />}>
                      <ProjectDetailPage />
                    </Suspense>
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
                    <Suspense fallback={<LoadingSpinner />}>
                      <GetInvolvedPage />
                    </Suspense>
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
                    <Suspense fallback={<LoadingSpinner />}>
                      <MediaPage />
                    </Suspense>
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/media/:id"
              element={
                <>
                  <Header />
                  <main>
                    <Suspense fallback={<LoadingSpinner />}>
                      <MediaDetailPage />
                    </Suspense>
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
                    <Suspense fallback={<LoadingSpinner />}>
                      <ContactPage />
                    </Suspense>
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
                    <Suspense fallback={<LoadingSpinner />}>
                      <LoginPage />
                    </Suspense>
                  </main>
                </>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <>
                  <main>
                    <Suspense fallback={<LoadingSpinner />}>
                      <ForgotPasswordPage />
                    </Suspense>
                  </main>
                </>
              }
            />
            {/* 404 - Catch all route */}
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <main>
                    <div className="container py-5 text-center">
                      <h1>404 - Page Not Found</h1>
                      <p>The page you are looking for does not exist.</p>
                    </div>
                  </main>
                  <Footer />
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
