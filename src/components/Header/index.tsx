import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button } from '@mui/material';
import cl from './index.module.scss';
import { useAppContext } from '../../contexts/AppContext/AppContext';

const Header = () => {
    const { modalOpen } = useAppContext();

    return (
        <header className={cl.header}>
            <h1>Pan0mera's toDo lists</h1>
            <Button variant="text" onClick={modalOpen}>
                <AddCircleOutlineOutlinedIcon /> Добавить
            </Button>
        </header>
    );
};

export default Header;
