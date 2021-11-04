import { Request, Response } from 'express';

export const response = (req: Request, res: Response) => {
  res.sendFile(res.locals.data);
};
