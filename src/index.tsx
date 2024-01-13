import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import MainContext from './contexts/MainContext';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import CookieAuth from './system/CookieAuth';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <MainContext>
            <>
                <CookieAuth />
                <RouterProvider router={router} />
            </>
        </MainContext>
    </React.StrictMode>,
);
