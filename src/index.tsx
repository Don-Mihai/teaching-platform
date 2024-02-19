import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Main from './pages/Main';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="515923033935-eaohjt4hlr1vd1u59rceqlj613v5un39.apps.googleusercontent.com">
            <RouterProvider router={router} />
        </GoogleOAuthProvider>
    </Provider>
);
