import React, { useCallback, useState } from 'react';
import { Todo, TodoStatus } from '../../models/Todo/types';

interface ToDoContextInitial {
    todos: Todo[];
    addToDo: (todo: Todo) => void;
    changeStatus: (todoId: string, newStatus: TodoStatus) => void;
    updateToDo: (todoId: string, name: string, desc: string, status: TodoStatus) => void;
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

    const addToDo = useCallback((todo: Todo) => {
        setTodos((prev) => [...prev, todo]);
    }, []);

    const updateToDo = useCallback(
        (todoId: string, name: string, desc: string, status: TodoStatus) => {
            const finded = todos.find((t) => t.id === todoId);
            if (!finded) throw new Error('Задача не найдена');

            finded.name = name;
            finded.description = desc;
            finded.status = status;

            setTodos((prev) => {
                return prev.map((t) => {
                    if (t.id !== todoId) return t;
                    return finded;
                });
            });
        },
        [todos],
    );

    const changeStatus = useCallback(
        (todoId: string, newStatus: TodoStatus) => {
            const todo = todos.find((t) => t.id === todoId);

            if (!todo) throw new Error('Такой задачи нет');

            todo.status = newStatus;

            setTodos((prev) => {
                return prev.map((el) => {
                    if (el.id !== todoId) return el;
                    return todo;
                });
            });
        },
        [todos],
    );

    return {
        todos,
        addToDo,
        changeStatus,
        updateToDo,
    };
};
