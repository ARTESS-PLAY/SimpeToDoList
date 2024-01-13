import TodoModel from '../models/Todo';
import { Request, Response } from 'express';
import { AuthRequest } from '../utils/checkAuth';

export const createToDo = async (req: AuthRequest, res: Response) => {
    try {
        const doc = new TodoModel({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            author: req.userId,
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

export const getAllTodos = async (req: AuthRequest, res: Response) => {
    try {
        const todos = await TodoModel.find({
            author: req.userId,
        });
        res.json(todos);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getTodo = async (req: AuthRequest, res: Response) => {
    try {
        const todoId = req.params.id;
        const todo = await TodoModel.findOne({
            _id: todoId,
            author: req.userId,
        });
        res.json(todo);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const removeTodo = async (req: AuthRequest, res: Response) => {
    try {
        const todoId = req.params.id;
        await TodoModel.findOneAndDelete({
            _id: todoId,
            author: req.userId,
        });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
    try {
        const todoId = req.params.id;
        const todo = await TodoModel.findOneAndUpdate(
            {
                _id: todoId,
                author: req.userId,
            },
            {
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
            },
        );

        res.json({ success: true });
    } catch (error) {
        res.status(500).json(error);
    }
};
