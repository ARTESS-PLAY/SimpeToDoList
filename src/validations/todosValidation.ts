import { body } from 'express-validator';

export const todoValidator = [
    body('name', 'Отсутствует название задачи').isLength({ min: 1 }),
    body('description', 'Отсутствует описание задачи').isLength({ min: 1 }),
    body('status', 'Отсутствует статус задачи').isLength({ min: 1 }),
];
