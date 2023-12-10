import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Auth from './pages/Auth';
import ModulesPage from './pages/ModulesPage';
import Listeners from './pages/Listeners';
import { PAGE_ROUTES } from './utils/types';
import Profile from './pages/Profile';

const router = createBrowserRouter([
    {
        path: PAGE_ROUTES.Auth,
        element: <Auth />,
    },
    {
        path: PAGE_ROUTES.Modules,
        element: <ModulesPage />,
    },
    {
        path: PAGE_ROUTES.Listeners,
        element: <Listeners />,
    },
    {
        path: PAGE_ROUTES.Profile,
        element: <Profile />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);
