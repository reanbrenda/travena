import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layout/dashboard';
import LoadOnlyLayout from './layout/LoadOnlyLayout';
//
import Login from './pages/login/Login';
import NotFound from './pages/404/Page404';
import Register from './pages/register/Register';
import DashboardApp from './pages/dashboard/DashboardApp';
import VerifyEmail from './pages/verify.email/VerifyEmail';
import Business from './pages/create.business/Business';
import AgencyCreate from './pages/create.agency/CreateAgency';
import AgencyTrips from './pages/trips/AgencyTrips';
import User from './pages/misc/users/User';
import ForgetPassword from './pages/forget.password/ForgetPassword';
import ResetPassword from './pages/reset.password/ResetPassword';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'trips', element: <AgencyTrips /> },
        { path: 'user', element: <User /> },
      ],
    },

    // Auth
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },

    {
      path: 'verify',
      element: <VerifyEmail/>,
    },

    {
      path: 'forget-password',
      element: <ForgetPassword />
    },

    {
      path: 'reset-password',
      element: <ResetPassword />
    },

    // Home
    {
      path: '/',
      element: <LoadOnlyLayout />,
    },
    {
      path: '/agency/create',
      element: <AgencyCreate />
    },

    // Business
    {
      path: '/business/create',
      element: <Business />
    },

    {
      path: '404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
