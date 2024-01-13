import { body } from 'express-validator';

export const userValidationLogin = [
    body('login', 'Логин не указен').isLength({ min: 1 }),
    body('password', 'Пароль не указен').isLength({ min: 1 }),
];
