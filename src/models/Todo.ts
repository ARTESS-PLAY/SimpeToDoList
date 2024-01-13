import mongoose from 'mongoose';

interface Todo {
    name: string;
    description: string;
    status: 'AWAITING' | 'IN PROCESS' | 'DONE';
    author: mongoose.Schema.Types.ObjectId;
}

const TodoSchema = new mongoose.Schema<Todo>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            requires: true,
        },
        status: {
            type: String,
            enum: ['AWAITING', 'IN PROCESS', 'DONE'],
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            requires: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Todo', TodoSchema);
