export interface Todo {
    id: string;
    name: string;
    description: string;
    status: TodoStatus;
    createAt: number;
}

export type TodoStatus = 'AWAITING' | 'IN PROCESS' | 'DONE';
