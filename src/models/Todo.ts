import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
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
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Todo', TodoSchema);
