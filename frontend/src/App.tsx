import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UnitsPage from './pages/UnitsPage';
import { useAuth } from './services/authService';

const PrivateRoutes = () => {
  const auth = useAuth();
  if (auth === null) return <div>Chargement...</div>;
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/units" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  // Routes protégées
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: '/units',
        element: <UnitsPage />,
      },
      // (...)
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;