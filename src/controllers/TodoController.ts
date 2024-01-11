import { validationResult, body } from 'express-validator';
import TodoModel from '../models/Todo';
import { Request, Response } from 'express';

export const createToDo = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        console.log('aboba');

        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
            return;
        }

        const doc = new TodoModel({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
        });

        const todo = await doc.save();

        res.json({
            success: true,
            data: {
                createTodo: todo,
            },
        });
    } catch (error) {
        res.status(500).json(error);
    }
};
