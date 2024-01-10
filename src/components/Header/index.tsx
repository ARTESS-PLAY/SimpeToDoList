import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button } from '@mui/material';
import cl from './index.module.scss';

const Header = () => {
    return (
        <header className={cl.header}>
            <h1>Pan0mera's toDo lists</h1>
            <Button variant="text">
                <AddCircleOutlineOutlinedIcon /> Добавить
            </Button>
        </header>
    );
};

export default Header;
