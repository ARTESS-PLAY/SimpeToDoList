import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import MainContext from './contexts/MainContext';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <MainContext>
            <RouterProvider router={router} />
        </MainContext>
    </React.StrictMode>,
);
