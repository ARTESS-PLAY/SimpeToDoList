import TextField from '@mui/material/TextField';
import cl from './index.module.scss';
import { useState } from 'react';
import ToDoStatus from '../ToDos/ToDo/ToDoStatus';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useAppContext } from '../../contexts/AppContext/AppContext';
import { useToDoContext } from '../../contexts/ToDoContext/ToDoContext';
import { createToDo } from '../../models/Todo/utils';
import { TodoStatus } from '../../models/Todo/types';

const Modal = () => {
    const { modalClose, modalRef, modalEditable, modalRole } = useAppContext();
    const { addToDo, updateToDo } = useToDoContext();

    let initTitle = '';
    let initDesc = '';
    let initStatus: TodoStatus = 'AWAITING';

    if (modalRole === 'EDIT') {
        initTitle = modalEditable.name;
        initDesc = modalEditable.description;
        initStatus = modalEditable.status;
    }

    const [title, setTitle] = useState(initTitle);
    const [description, setDescription] = useState(initDesc);
    const [status, setStatus] = useState<TodoStatus>(initStatus);

    const handleChangeStatus = (status: TodoStatus) => {
        setStatus(status);
    };

    const handleCreateToDo = () => {
        if (title.length < 1) {
            alert('Название должно присутсвовать!');
            return;
        }
        if (description.length < 1) {
            alert('Описание должно присутсвовать!');
            return;
        }

        const newToDo = createToDo(title, description, status);
        addToDo(newToDo);
        modalClose();
    };

    const handleUpdateToDo = () => {
        if (title.length < 1) {
            alert('Название должно присутсвовать!');
            return;
        }
        if (description.length < 1) {
            alert('Описание должно присутсвовать!');
            return;
        }

        updateToDo(modalEditable.id, title, description, status);
        modalClose();
    };

    return (
        <div className={cl.modal} ref={modalRef} onClick={modalClose}>
            <div className={cl.modal_content} onClick={(e) => e.stopPropagation()}>
                <p className={cl.modal_title}>
                    {modalRole === 'CREATE' ? 'Создать задачу' : 'Редактировать задачу'}
                </p>
                <div onClick={modalClose}>
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
                <ToDoStatus status={status} handleChangeStatus={handleChangeStatus} />
                <Button
                    variant="contained"
                    fullWidth
                    className={cl.modal_button}
                    onClick={modalRole === 'CREATE' ? handleCreateToDo : handleUpdateToDo}>
                    {modalRole === 'CREATE' ? 'Создать' : 'Сохранить'}
                </Button>
            </div>
        </div>
    );
};

export default Modal;
