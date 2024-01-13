import { useAppContext } from '../../contexts/AppContext/AppContext';
import cl from './index.module.scss';

const Header = () => {
    const { currentUser, logout } = useAppContext();

    return (
        <header className={cl.header}>
            <div className={cl.header__content}>
                <h1>Pan0mera's toDo lists</h1>
                <div className={cl.user}>
                    <p>Привет, {currentUser?.login}</p>
                    <p onClick={logout}>Выйти</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
