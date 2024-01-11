import { Accordion, Typography, AccordionDetails, styled } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import ToDoStatus from './ToDoStatus';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import cl from './index.module.scss';
import { Todo as TodoT, TodoStatus } from '../../../models/Todo/types';
import { useToDoContext } from '../../../contexts/ToDoContext/ToDoContext';

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
    const { changeStatus } = useToDoContext();

    const handleChange = (newStatus: TodoStatus) => {
        changeStatus(todo.id, newStatus);
    };

    return (
        <Accordion
            className={cl.accordion + (todo.status === 'DONE' ? ' ' + cl['accordion-done'] : '')}>
            <AccordionSummary className={cl.accordion__head}>
                <Typography>{todo.name}</Typography>
                <div className={cl.controls}>
                    <ToDoStatus status={todo.status} handleChangeStatus={handleChange} />
                    <EditIcon />
                    <DeleteIcon />
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{todo.description}</Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default Todo;
