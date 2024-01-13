export const config = {
    port: process.env.PORT || 3005,
    mongodbURL:
        process.env.MONGODBURL ||
        'mongodb+srv://login:password@todos.q41cgsb.mongodb.net/?retryWrites=true&w=majority',
    secret: process.env.SECRET || 'secret',
};
