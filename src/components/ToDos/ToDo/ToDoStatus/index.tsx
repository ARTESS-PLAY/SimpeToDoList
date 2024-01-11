import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { TodoStatus } from '../../../../models/Todo/types';
import { renderStatusValue, statusFactory } from './StatusFactort';
import cl from './index.module.scss';

const allStatuses: TodoStatus[] = ['AWAITING', 'IN PROCESS', 'DONE'];

const ToDoStatus = ({ status }: { status: TodoStatus }): JSX.Element => {
    const [age, setAge] = useState<TodoStatus>(status);

    const handleChange = (e: SelectChangeEvent<TodoStatus>) => {
        const newStatus = e.target.value as TodoStatus;
        setAge(newStatus);
    };

    return (
        <Select
            value={age}
            MenuProps={{
                PaperProps: {
                    className: cl.select_menu,
                },
            }}
            sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                },
            }}
            onChange={handleChange}
            onClick={(e) => {
                e.stopPropagation();
            }}
            className={cl.select}
            renderValue={renderStatusValue}>
            {allStatuses.map((status) => statusFactory(status))}
        </Select>
    );
};

export default ToDoStatus;
