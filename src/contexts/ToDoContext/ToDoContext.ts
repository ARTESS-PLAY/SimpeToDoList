import React, { useCallback, useState } from 'react';
import { Todo } from '../../models/Todo/types';

interface ToDoContextInitial {
    todos: Todo[];
}

//контекст для тудушек
export const ToDoContext = React.createContext<ToDoContextInitial>({} as ToDoContextInitial);

//функция будет возвращать контекст c тудушками
export function useToDoContext() {
    const context = React.useContext(ToDoContext);
    if (!context) throw new Error('Use ToDo context within provider!');
    return context;
}

//функция с глобальным хранилищем
export const useCreateToDoContext = (): ToDoContextInitial => {
    //тудушки
    const [todos, setTodos] = useState<Todo[]>([]);

    return {
        todos,
    };
};
