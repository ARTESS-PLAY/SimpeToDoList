import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LoginForm from '../components/auth/LoginForm';
import ProtectionRoute from './ProtectionRoute';
import RegisterForm from '../components/auth/RegisterForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectionRoute type="AUTHORIZED">
                <App />
            </ProtectionRoute>
        ),
    },
    {
        path: '/login',
        element: (
            <ProtectionRoute type="NOT AUTHORIZED">
                <LoginForm />
            </ProtectionRoute>
        ),
    },
    {
        path: '/register',
        element: (
            <ProtectionRoute type="NOT AUTHORIZED">
                <RegisterForm />
            </ProtectionRoute>
        ),
    },
]);

export default router;
