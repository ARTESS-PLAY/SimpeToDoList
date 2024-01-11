import { useId } from 'react';
import { Todo, TodoStatus } from './types';
import { uuidv4 } from '../../share/helpers';

export const createToDo = (name: string, desc: string, status: TodoStatus): Todo => {
    if (name.length < 1) throw new Error('Название не должно быть меньше 1 символа!');

    if (desc.length < 1) throw new Error('Описание не должно быть меньше 1 символа!');

    const timeNow = Date.now();
    const id = uuidv4();

    return {
        id: id,
        name: name,
        description: desc,
        status: status,
        createAt: timeNow,
    };
};
