import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/authStore';
import { AuthPage } from './components/AuthPage';
import { TaskDashboard } from './pages/TaskDashboard';
import PropTypes from 'prop-types';

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  if (!token) return <Navigate to="/auth" replace />;
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TaskDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;