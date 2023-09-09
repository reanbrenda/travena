// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Bookings',
    path: '/dashboard/bookings',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Trips',
    path: '/dashboard/trips',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Reports',
    path: '/dashboard/reports',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'User management',
    path: '/dashboard/user-management',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: getIcon('eva:shopping-bag-fill'),
  },
];

export default navConfig;
