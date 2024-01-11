import { Accordion, Typography, AccordionDetails, styled } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import ToDoStatus from './ToDoStatus';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import cl from './index.module.scss';

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

const Todo = () => {
    return (
        <Accordion className={cl.accordion}>
            <AccordionSummary className={cl.accordion__head}>
                <Typography>Accordion 1</Typography>
                <div className={cl.controls}>
                    <ToDoStatus status="AWAITING" />
                    <EditIcon />
                    <DeleteIcon />
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                    lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default Todo;
