import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { TodoStatus } from '../../../../models/Todo/types';
import { renderStatusValue, statusFactory } from './StatusFactort';
import cl from './index.module.scss';

const allStatuses: TodoStatus[] = ['AWAITING', 'IN PROCESS', 'DONE'];

const ToDoStatus = ({
    status,
    handleChangeStatus,
}: {
    status: TodoStatus;
    handleChangeStatus: (status: TodoStatus) => void;
}): JSX.Element => {
    const handleChange = (e: SelectChangeEvent<TodoStatus>) => {
        const newStatus = e.target.value as TodoStatus;
        handleChangeStatus(newStatus);
    };

    return (
        <Select
            value={status}
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
            {allStatuses.map((status, i) => statusFactory(status, i))}
        </Select>
    );
};

export default ToDoStatus;
