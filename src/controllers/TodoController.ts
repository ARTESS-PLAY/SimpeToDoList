import { validationResult } from 'express-validator';
import TodoModel from '../models/Todo';
import { Request, Response } from 'express';

export const createToDo = async (req: Request, res: Response) => {
    try {
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

export const getAllTodos = async (req: Request, res: Response) => {
    try {
        const todos = await TodoModel.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getTodo = async (req: Request, res: Response) => {
    try {
        const todoId = req.params.id;
        await TodoModel.findById(todoId, (err, doc) => {
            if (err) return res.status(500).json(err);

            if (!doc) return res.status(404).json({ message: 'Задача не найдена' });

            res.json(doc);
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const removeTodo = async (req: Request, res: Response) => {
    try {
        const todoId = req.params.id;
        await TodoModel.findByIdAndDelete(todoId, (err, doc) => {
            if (err) return res.status(500).json(err);

            if (!doc) return res.status(404).json({ message: 'Задача не найдена' });

            res.json({ success: true });
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const todoId = req.params.id;
        await TodoModel.findByIdAndDelete(todoId, {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
        });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json(error);
    }
};
