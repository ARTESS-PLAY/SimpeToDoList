import MenuItem from '@mui/material/MenuItem';
import { TodoStatus } from '../../../../models/Todo/types';
import { ReactNode } from 'react';
import cl from './index.module.scss';

export const statusFactory = (status: TodoStatus, key: string | number): JSX.Element => {
    switch (status) {
        case 'AWAITING':
            return (
                <MenuItem value={'AWAITING'} key={key}>
                    Ожидает выполнения
                </MenuItem>
            );

        case 'IN PROCESS':
            return (
                <MenuItem value={'IN PROCESS'} key={key}>
                    В процессе
                </MenuItem>
            );

        case 'DONE':
            return (
                <MenuItem value={'DONE'} key={key}>
                    Сделано
                </MenuItem>
            );

        default:
            const neverCheck: never = status;
            throw new Error('An unprocessed case for the status');
    }
};

export const renderStatusValue = (value: TodoStatus): ReactNode => {
    switch (value) {
        case 'AWAITING':
            return <div className={cl.value + ' ' + cl['value-awaiting']}>Ожидает выполнения</div>;

        case 'IN PROCESS':
            return <div className={cl.value + ' ' + cl['value-process']}>В процессе</div>;

        case 'DONE':
            return <div className={cl.value + ' ' + cl['value-done']}>Сделано</div>;

        default:
            const neverCheck: never = value;
            throw new Error('An unprocessed case for the status');
    }
};
