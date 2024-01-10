export interface Todo {
    name: string;
    description: string;
    status: TodoStatus;
    createAt: number;
}

export type TodoStatus = 'AWAITING' | 'IN PROCESS' | 'DONE';
