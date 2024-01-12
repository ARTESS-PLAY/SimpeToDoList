import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
        return;
    }
    next();
};

export default handleValidationErrors;
