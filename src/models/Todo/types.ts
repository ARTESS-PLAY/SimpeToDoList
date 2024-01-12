export interface Todo {
    id: string;
    name: string;
    description: string;
    status: TodoStatus;
    createdAt: string;
    updatedAt: string;
}

export type TodoStatus = 'AWAITING' | 'IN PROCESS' | 'DONE';
