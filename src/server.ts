import express from 'express';
import mongoose from 'mongoose';
import { todoValidator } from './validations/todosValidation';
import cors from 'cors';
import { config } from './serverConfig';
import {
    createToDo,
    getAllTodos,
    getTodo,
    removeTodo,
    updateTodo,
} from './controllers/TodoController';
import handleValidationErrors from './utils/handleValidationErrors';
import { authUser, createUser } from './controllers/UserController';
import { userValidationLogin } from './validations/userValidation';
import { checkAuth } from './utils/checkAuth';

/* DATABASE CONNECT */

mongoose
    .connect(config.mongodbURL)
    .then(() => {
        console.log('connect to db');
    })
    .catch((err) => {
        console.log(`DB error ${err}`);
        console.log(config.mongodbURL);
    });

/* DATABASE END */

/* CONFIGURATE APP */
const app = express();
app.use(express.json());
app.use(cors());
app.listen(config.port, () => {
    console.log(`Listening port ${config.port}`);
});
/* CONFIGURATE APP END*/

app.get('/api/todos/', checkAuth, getAllTodos);
app.get('/api/todos/:id', checkAuth, getTodo);
app.post('/api/todos/', checkAuth, todoValidator, handleValidationErrors, createToDo);
app.delete('/api/todos/:id', checkAuth, removeTodo);
app.patch('/api/todos/:id', checkAuth, todoValidator, handleValidationErrors, updateTodo);

app.post('/api/user/create', userValidationLogin, handleValidationErrors, createUser);
app.post('/api/user/auth', userValidationLogin, handleValidationErrors, authUser);
