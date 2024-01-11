import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button } from '@mui/material';
import cl from './index.module.scss';
import { useAppContext } from '../../contexts/AppContext/AppContext';

const Header = () => {
    const { modalOpenCreate } = useAppContext();

    return (
        <header className={cl.header}>
            <div className={cl.header__content}>
                <h1>Pan0mera's toDo lists</h1>
                <Button variant="text" onClick={modalOpenCreate} className={cl.header__button}>
                    <AddCircleOutlineOutlinedIcon /> Добавить
                </Button>
            </div>
        </header>
    );
};

export default Header;
