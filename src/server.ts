import express from 'express';
import mongoose from 'mongoose';
import { todoValidator } from './validations/todosValidation';
import cors from 'cors';
import config from './serverConfig.json';
import {
    createToDo,
    getAllTodos,
    getTodo,
    removeTodo,
    updateTodo,
} from './controllers/TodoController';
import handleValidationErrors from './utils/handleValidationErrors';

/* DATABASE CONNECT */

mongoose
    .connect(config.mongodbURL)
    .then(() => {
        console.log('connect to db');
    })
    .catch((err) => console.log(`DB error ${err} h`));

/* DATABASE END */

/* CONFIGURATE APP */
const app = express();
app.use(express.json());
app.use(cors());
app.listen(config.port, () => {
    console.log(`Listening port ${config.port}`);
});
/* CONFIGURATE APP END*/

app.get('/api/todos/', getAllTodos);
app.get('/api/todos/:id', getTodo);
app.post('/api/todos/', todoValidator, handleValidationErrors, createToDo);
app.delete('/api/todos/:id', removeTodo);
app.patch('/api/todos/:id', todoValidator, handleValidationErrors, updateTodo);
