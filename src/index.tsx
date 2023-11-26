import './styles/index.scss'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Auth from './pages/Auth';

const router = createBrowserRouter([
  {
      path: '/',
      element: <Auth />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);
