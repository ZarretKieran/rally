import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Friends } from './pages/Friends';
import { Hangouts } from './pages/Hangouts';
import { CreateHangout } from './pages/CreateHangout';
import { Spontaneous } from './pages/Spontaneous';
import { Profile } from './pages/Profile';

function App() {
  // In a real app, this would check if user is authenticated/onboarded
  const isOnboarded = localStorage.getItem('rally_onboarded') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/*"
          element={
            isOnboarded ? (
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/friends" element={<Friends />} />
                  <Route path="/hangouts" element={<Hangouts />} />
                  <Route path="/hangouts/new" element={<CreateHangout />} />
                  <Route path="/spontaneous" element={<Spontaneous />} />
                  <Route path="/spontaneous/asap" element={<Spontaneous />} />
                  <Route path="/spontaneous/open-hours" element={<Spontaneous />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
