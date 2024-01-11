import express from 'express';
import mongoose from 'mongoose';
import { todoValidator } from './validations/todosValidation';

import cors from 'cors';
import config from './serverConfig.json';

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

app.post('/api/todos/', todoValidator);
app.get('/api/todos/');
app.get('/api/todos/:id');
app.delete('/api/todos/:id');
app.patch('/api/todos/:id');
