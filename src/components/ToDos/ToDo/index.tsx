import { Accordion, Typography, AccordionDetails, styled } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import ToDoStatus from './ToDoStatus';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import cl from './index.module.scss';
import { Todo as TodoT, TodoStatus } from '../../../models/Todo/types';
import { useToDoContext } from '../../../contexts/ToDoContext/ToDoContext';
import { useAppContext } from '../../../contexts/AppContext/AppContext';

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary {...props} />
))(() => ({
    '& .MuiAccordionSummary-content': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

const Todo = ({ todo }: { todo: TodoT }) => {
    const { changeStatus, removeToDo } = useToDoContext();
    const { modalOpenEdit } = useAppContext();

    const handleChange = (newStatus: TodoStatus) => {
        changeStatus(todo.id, newStatus);
    };

    const handleClickEdit = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        modalOpenEdit(todo);
    };

    const handleClickDelete = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        const res = window.confirm('Вы уверены, что хотите удалить задачу?');
        if (res) removeToDo(todo.id);
    };

    return (
        <Accordion
            className={cl.accordion + (todo.status === 'DONE' ? ' ' + cl['accordion-done'] : '')}>
            <AccordionSummary className={cl.accordion__head}>
                <Typography>{todo.name}</Typography>
                <div className={cl.controls}>
                    <ToDoStatus status={todo.status} handleChangeStatus={handleChange} />
                    <span onClick={handleClickEdit}>
                        <EditIcon />
                    </span>
                    <span onClick={handleClickDelete}>
                        <DeleteIcon />
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
