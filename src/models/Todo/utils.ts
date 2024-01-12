import { Todo, TodoStatus } from './types';

export interface BackEndToDo {
    createdAt: string;
    description: string;
    name: string;
    status: TodoStatus;
    updatedAt: string;
    _id: string;
}

export const convertTodoFromBackend = (data: BackEndToDo): Todo => {
    const todo = {
        id: data._id,
        createdAt: data.createdAt,
        description: data.description,
        name: data.name,
        status: data.status,
        updatedAt: data.updatedAt,
    };

    return todo;
};
