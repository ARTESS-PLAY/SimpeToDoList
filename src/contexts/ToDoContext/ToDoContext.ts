import React, { useCallback, useState } from 'react';
import { Todo, TodoStatus } from '../../models/Todo/types';

interface ToDoContextInitial {
    todos: Todo[];
    addToDo: (todo: Todo) => void;
    changeStatus: (todoId: string, newStatus: TodoStatus) => void;
    updateToDo: (todoId: string, todo: Todo) => void;
    removeToDo: (todoId: string) => void;
    addToDos: (todos: Todo[]) => void;
    isFirtsRender: boolean;
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
    const [isFirtsRender, setIsFirtsRender] = useState(true);

    const addToDo = useCallback((todo: Todo) => {
        setTodos((prev) => [todo, ...prev]);
    }, []);

    const addToDos = useCallback((todos: Todo[]) => {
        setTodos(todos);
        setIsFirtsRender(false);
    }, []);

    const updateToDo = useCallback(
        (todoId: string, todo: Todo) => {
            const finded = todos.find((t) => t.id === todoId);
            if (!finded) throw new Error('Задача не найдена');

            setTodos((prev) => {
                return prev.map((t) => {
                    if (t.id !== todoId) return t;
                    return todo;
                });
            });
        },
        [todos],
    );

    const removeToDo = useCallback((todoId: string) => {
        setTodos((prev) => prev.filter((t) => t.id !== todoId));
    }, []);

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
        removeToDo,
        addToDos,
        isFirtsRender,
    };
};
