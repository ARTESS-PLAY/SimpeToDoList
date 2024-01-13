import axios from 'axios';
import { TodoStatus } from '../models/Todo/types';
import { BackEndToDo } from '../models/Todo/utils';

export interface TodoDTO {
    name: string;
    description: string;
    status: TodoStatus;
}

class TodoApi {
    private slug = 'http://localhost:3005/api/todos';
    private auth = '';

    public getTodos = async () => {
        const todos = await axios
            .get<BackEndToDo[]>(this.slug, {
                headers: {
                    Authorization: this.auth,
                },
            })
            .then((res) => res.data)
            .catch((e) => console.log(e));

        return todos;
    };

    public getTodo = async (todoId: string) => {
        const todo = await axios
            .get<BackEndToDo>(`${this.slug}/${todoId}`, {
                headers: {
                    Authorization: this.auth,
                },
            })
            .then((res) => res.data)
            .catch((e) => console.log(e));

        return todo;
    };

    public createTodo = async (data: TodoDTO) => {
        const res = await axios
            .post<{
                data: {
                    createTodo: BackEndToDo;
                };
                success: boolean;
            }>(this.slug, data, {
                headers: {
                    Authorization: this.auth,
                },
            })
            .then((res) => res.data)
            .catch((e) => console.log(e));

        return res;
    };

    public updateTodo = async (todoId: string, data: TodoDTO) => {
        const res = await axios
            .patch<{ success: boolean }>(`${this.slug}/${todoId}`, data, {
                headers: {
                    Authorization: this.auth,
                },
            })
            .then((res) => res.data)
            .catch((e) => console.log(e));

        return res;
    };

    public deleteTodo = async (todoId: string) => {
        const res = await axios
            .delete(`${this.slug}/${todoId}`, {
                headers: {
                    Authorization: this.auth,
                },
            })
            .then((res) => res.data)
            .catch((e) => console.log(e));

        return res.success ? res.success : false;
    };

    public setAuth = (token: string) => (this.auth = token);
}

const todoApi = new TodoApi();
export default todoApi;
