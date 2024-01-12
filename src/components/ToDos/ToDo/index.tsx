import { Accordion, Typography, AccordionDetails, AccordionSummary } from '@mui/material';
import ToDoStatus from './ToDoStatus';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import cl from './index.module.scss';
import { Todo as TodoT, TodoStatus } from '../../../models/Todo/types';
import { useToDoContext } from '../../../contexts/ToDoContext/ToDoContext';
import { useAppContext } from '../../../contexts/AppContext/AppContext';
import todoApi from '../../../api/TodoApi';

const Todo = ({ todo }: { todo: TodoT }) => {
    const { changeStatus, removeToDo } = useToDoContext();
    const { modalOpenEdit } = useAppContext();

    const handleChange = async (newStatus: TodoStatus) => {
        changeStatus(todo.id, newStatus);
        const res = await todoApi.updateTodo(todo.id, {
            name: todo.name,
            description: todo.description,
            status: newStatus,
        });
    };

    const handleClickEdit = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        modalOpenEdit(todo);
    };

    const handleClickDelete = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        const res = window.confirm('Вы уверены, что хотите удалить задачу?');
        if (res) {
            removeToDo(todo.id);

            const res = await todoApi.deleteTodo(todo.id);

            if (!res || res.success == false) console.log(res);
        }
    };

    return (
        <Accordion
            className={cl.accordion + (todo.status === 'DONE' ? ' ' + cl['accordion-done'] : '')}>
            <AccordionSummary className={cl.accordion__head}>
                <Typography>{todo.name}</Typography>
                <div className={cl.controls}>
                    <ToDoStatus status={todo.status} handleChangeStatus={handleChange} />
                    <span onClick={handleClickEdit}>
                        <EditIcon className={cl.edit} />
                    </span>
                    <span onClick={handleClickDelete}>
                        <DeleteIcon className={cl.delete} />
                    </span>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{todo.description}</Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default Todo;
