
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

// ✅ Lazy imports (Code splitting)
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
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
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

// ✅ Admin Components
const AdminLayout = lazy(() => import('./Admin/AdminLayout'));
const Dashboard = lazy(() => import('./Admin/Dashboard'));
const GetInvolved = lazy(() => import('./Admin/GetInvolved'));
const Project = lazy(() => import('./Admin/Project'));
const Program = lazy(() => import('./Admin/Program'));
const Opportunity = lazy(() => import('./Admin/Opportunity'));
const Media = lazy(() => import('./Admin/Media'));
const Contact = lazy(() => import('./Admin/Contact'));
const UserProfile = lazy(() => import('./Admin/UserProfile'));
const FeaturedEvent = lazy(() => import('./Admin/FeaturedEvent'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

          {/* Wrap routes in Suspense */}
          <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
            <Routes>
              {/* ✅ Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute adminOnly={true} />}>
                <Route element={<AdminLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="get-involved" element={<GetInvolved />} />
                  <Route path="projects" element={<Project />} />
                  <Route path="programs" element={<Program />} />
                  <Route path="opportunities" element={<Opportunity />} />
                  <Route path="media" element={<Media />} />
                  <Route path="media/:id" element={<MediaDetailPage />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="featured-events" element={<FeaturedEvent />} />
                </Route>
              </Route>

              {/* ✅ Public Routes */}
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
                path="/projects/:id"
                element={
                  <>
                    <Header />
                    <main>
                      <ProjectDetailPage />
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
                path="/media/:id"
                element={
                  <>
                    <Header />
                    <main>
                      <MediaDetailPage />
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
                  <main>
                    <LoginPage />
                  </main>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <Header />
                    <main>
                      <NotFoundPage />
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
