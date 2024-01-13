import mongoose from 'mongoose';

interface User {
    login: string;
    password: string;
}

const UserSchema = new mongoose.Schema<User>(
    {
        login: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            requires: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);
