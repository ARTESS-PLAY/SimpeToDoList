import { Request, Response } from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from '../serverConfig';

const secretKey = config.secret;

export const createUser = async (req: Request, res: Response) => {
    try {
        const login = req.body.login;
        const password = req.body.password;

        const finded = await UserModel.find({
            login: login,
        });

        if (finded.length > 0)
            return res.json({ success: false, msg: 'Пользователь с таким логином уже есть' });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            login: login,
            password: passwordHash,
        });

        const result = await doc.save();

        const token = jwt.sign(
            {
                id: result._id,
                login: result.login,
            },
            secretKey,
            {
                expiresIn: '30d',
            },
        );

        res.json({ success: true, msg: '', token });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const authUser = async (req: Request, res: Response) => {
    try {
        const login = req.body.login;
        const password = req.body.password;

        const finded = await UserModel.findOne({
            login: login,
        });

        if (!finded) return res.json({ success: false, msg: 'Логин или пароль не верный' });

        const isValidPassword = await bcrypt.compare(password, finded.password);

        if (!isValidPassword)
            return res.json({ success: false, msg: 'Логин или пароль не верный' });

        const token = jwt.sign(
            {
                id: finded._id,
                login: finded.login,
            },
            secretKey,
            {
                expiresIn: '30d',
            },
        );

        res.json({ success: true, msg: '', token });
    } catch (error) {
        res.status(500).json(error);
    }
};
