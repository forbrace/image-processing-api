import { Request, Response, NextFunction } from 'express';

export const index = (req: Request, res: Response, next: NextFunction) => {
  if (req.baseUrl === req.originalUrl) {
    const message = `
      Usage example: ${req.protocol}://${req.get(
      'Host'
    )}/api/images?filename=encenadaport&width=200&height=200
      `;
    return res.send(message);
  }
  next();
};
