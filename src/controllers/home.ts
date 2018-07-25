import { Request, Response } from 'express';
import { NextFunction } from 'connect';

export let index = (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
}