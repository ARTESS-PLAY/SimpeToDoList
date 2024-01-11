import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button } from '@mui/material';
import cl from './index.module.scss';

interface HeaderProps {
    handleOpenModal: () => void;
}

const Header = ({ handleOpenModal }: HeaderProps) => {
    return (
        <header className={cl.header}>
            <h1>Pan0mera's toDo lists</h1>
            <Button variant="text" onClick={handleOpenModal}>
                <AddCircleOutlineOutlinedIcon /> Добавить
            </Button>
        </header>
    );
};

export default Header;
