import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Panics = React.lazy(() => import('./views/Panics/Panics'));
const Panic = React.lazy(() => import('./views/Panics/Panic'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/panics/:status', name: 'Panics', component: Panics },
  { path: '/panic:id', name: 'Panic', component: Panic },
];

export default routes;
