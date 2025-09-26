
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong.</h2>
            <p className="text-gray-600 mb-4">We're having trouble loading this page. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Lazy load components with retry mechanism
const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.localStorage.getItem('page-has-been-force-refreshed') || 'false'
    );

    try {
      const component = await componentImport();
      window.localStorage.setItem('page-has-been-force-refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.localStorage.setItem('page-has-been-force-refreshed', 'true');
        return window.location.reload();
      }
      throw error;
    }
  });

// Lazy load components with preload hint
const lazyWithPreload = (factory) => {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
};

// Layout Components
const MainLayout = ({ children }) => (
  <>
    <Suspense fallback={null}>
      <Header />
    </Suspense>
    <main className="min-h-[calc(100vh-200px)]">{children}</main>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </>
);

const AuthLayout = ({ children }) => (
  <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    {children}
  </main>
);

// Public Pages
const Header = lazyWithPreload(() => import('./components/Header'));
const Footer = lazyWithPreload(() => import('./components/Footer'));
const HomePage = lazyWithPreload(() => import('./pages/HomePage'));
const AboutPage = lazyWithPreload(() => import('./pages/AboutPage'));
const OurWorkPage = lazyWithPreload(() => import('./pages/OurWorkPage'));
const ProjectDetailPage = lazyWithPreload(() => import('./pages/ProjectDetailPage'));
const GetInvolvedPage = lazyWithPreload(() => import('./pages/GetInvolvedPage'));
const MediaPage = lazyWithPreload(() => import('./pages/MediaPage'));
const MediaDetailPage = lazyWithPreload(() => import('./pages/MediaDetailPage'));
const ContactPage = lazyWithPreload(() => import('./pages/ContactPage'));
const LoginPage = lazyWithPreload(() => import('./pages/LoginPage'));
const ForgotPasswordPage = lazyWithPreload(() => import('./pages/ForgotPasswordPage'));
const NotFoundPage = lazyWithPreload(() => import('./pages/NotFoundPage'));

// Admin Components
const AdminLayout = lazyWithPreload(() => import('./Admin/AdminLayout'));
const Dashboard = lazyWithPreload(() => import('./Admin/Dashboard'));
const GetInvolved = lazyWithPreload(() => import('./Admin/GetInvolved'));
const Project = lazyWithPreload(() => import('./Admin/Project'));
const Program = lazyWithPreload(() => import('./Admin/Program'));
const Opportunity = lazyWithPreload(() => import('./Admin/Opportunity'));
const Media = lazyWithPreload(() => import('./Admin/Media'));
const Contact = lazyWithPreload(() => import('./Admin/Contact'));
const UserProfile = lazyWithPreload(() => import('./Admin/UserProfile'));
const FeaturedEvent = lazyWithPreload(() => import('./Admin/FeaturedEvent'));
const ProtectedRoute = lazyWithPreload(() => import('./components/ProtectedRoute'));

// Preload routes when hovering over navigation links
const preloadRoute = (component) => {
  if (component && component.preload) {
    component.preload();
  }
};

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <div className="App">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <ProtectedRoute adminOnly={true} />
                      </Suspense>
                    </ErrorBoundary>
                  }
                >
                  <Route 
                    element={
                      <ErrorBoundary>
                        <Suspense fallback={<LoadingSpinner />}>
                          <AdminLayout />
                        </Suspense>
                      </ErrorBoundary>
                    }
                  >
                    <Route index element={<Navigate to="dashboard" replace />} />
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

                {/* Public Routes */}
                <Route 
                  path="/" 
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <MainLayout>
                          <HomePage />
                        </MainLayout>
                      </Suspense>
                    </ErrorBoundary>
                  } 
                />
                
                <Route 
                  path="/about" 
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <MainLayout>
                          <AboutPage />
                        </MainLayout>
                      </Suspense>
                    </ErrorBoundary>
                  } 
                />

                <Route 
                  path="/our-work" 
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <MainLayout>
                          <OurWorkPage />
                        </MainLayout>
                      </Suspense>
                    </ErrorBoundary>
                  } 
                />

                <Route 
                  path="/projects/:id" 
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <MainLayout>
                          <ProjectDetailPage />
                        </MainLayout>
                      </Suspense>
                    </ErrorBoundary>
                  } 
                />

                <Route 
                  path="/get-involved" 
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <MainLayout>
                          <GetInvolvedPage />
                        </MainLayout>
                      </Suspense>
                    </ErrorBoundary>
                  } 
                />

                <Route 
                  path="/media" 
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <MainLayout>
                          <MediaPage />
                        </MainLayout>
                      </Suspense>
                    </ErrorBoundary>
                  } 
                />

                <Route 
                  path="/media/:id" 
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <MainLayout>
                          <MediaDetailPage />
                        </MainLayout>
                      </Suspense>
                    </ErrorBoundary>
                  } 
                />

                <Route 
                  path="/contact" 
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <MainLayout>
                          <ContactPage />
                        </MainLayout>
                      </Suspense>
                    </ErrorBoundary>
                  } 
                />

                <Route 
                  path="/login/admin" 
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <AuthLayout>
                          <LoginPage />
                        </AuthLayout>
                      </Suspense>
                    </ErrorBoundary>
                  } 
                />

                <Route 
                  path="/forgot-password" 
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <AuthLayout>
                          <ForgotPasswordPage />
                        </AuthLayout>
                      </Suspense>
                    </ErrorBoundary>
                  } 
                />

                {/* 404 - Not Found */}
                <Route 
                  path="*" 
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <MainLayout>
                          <NotFoundPage />
                        </MainLayout>
                      </Suspense>
                    </ErrorBoundary>
                  } 
                />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
