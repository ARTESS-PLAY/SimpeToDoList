import TextField from '@mui/material/TextField';
import cl from './index.module.scss';
import { useState } from 'react';
import ToDoStatus from '../ToDos/ToDo/ToDoStatus';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    modalRef: React.RefObject<HTMLDivElement>;
    handleClose: () => void;
}

const Modal = ({ modalRef, handleClose }: ModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className={cl.modal} ref={modalRef} onClick={handleClose}>
            <div className={cl.modal_content} onClick={(e) => e.stopPropagation()}>
                <p className={cl.modal_title}>Создать задачу</p>
                <div onClick={handleClose}>
                    <CloseIcon className={cl.modal_close} />
                </div>
                <TextField
                    fullWidth
                    label="Название задачи"
                    value={title}
                    className={cl.modal_text_title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Описание задачи"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    className={cl.modal_textarea}
                    rows={4}
                />
                <ToDoStatus status="AWAITING" />
                <Button variant="contained" fullWidth className={cl.modal_button}>
                    Создать
                </Button>
            </div>
        </div>
    );
};

export default Modal;
