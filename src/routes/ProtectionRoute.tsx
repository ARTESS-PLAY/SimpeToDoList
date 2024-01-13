import { Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext/AppContext';
import { RouteProtection } from './types';

const ProtectionRoute = ({ type, children }: { type: RouteProtection; children: JSX.Element }) => {
    const { currentUser } = useAppContext();

    if (currentUser === null && type === 'AUTHORIZED') return <Navigate to="/login" />;
    if (currentUser !== null && type === 'NOT AUTHORIZED') return <Navigate to="/" />;

    return children;
};

export default ProtectionRoute;
