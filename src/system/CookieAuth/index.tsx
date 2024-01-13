import { useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext/AppContext';
import { getCookie } from '../../share/cookie';

const CookieAuth = () => {
    const { authUser } = useAppContext();

    useEffect(() => {
        const tokenCookie = getCookie('userToken');
        if (tokenCookie) {
            authUser(tokenCookie);
        }
    }, []);

    return <></>;
};

export default CookieAuth;
