import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Panics = React.lazy(() => import('./views/Panics/Panics'));
const Panic = React.lazy(() => import('./views/Panics/Panic'));
const Client = React.lazy(() => import('./views/Clients/CreateEditClients'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/panics', name: 'Panics', component: Panics },
  { path: '/panic/:id', name: 'Panic', component: Panic },
  { path: '/client', name: 'Client', component: Client },
];

export default routes;
