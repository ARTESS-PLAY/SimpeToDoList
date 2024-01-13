import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as config from '../serverConfig.json';
/* Функция посредник, которая проверяет авторизацию пользователя */

export interface AuthRequest extends Request {
    userId: string;
}

export const checkAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || '';

    if (!token) return res.status(403).json({ msg: 'Нет доступа' });

    try {
        const decoded = jwt.verify(token, config.secret);

        //@ts-ignore
        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(403).json({ msg: 'Нет доступа' });
    }
};
