import NodeCache from 'node-cache';
import { Request, Response, NextFunction } from 'express';

// stdTTL: time to live in seconds for every generated cache element.
const cache = new NodeCache({ stdTTL: 5 * 60 });

const getUrlFromRequest = (req: Request) => {
  return req.protocol + '://' + req.headers.host + req.originalUrl;
};

const set = (req: Request, res: Response, next: NextFunction) => {
  const url = getUrlFromRequest(req);
  cache.set(url, res.locals.data);
  return next(); // => response
};

const get = (req: Request, res: Response, next: NextFunction) => {
  const url = getUrlFromRequest(req);
  const content = cache.get(url);
  if (content) {
    return res.status(200).sendFile(<string>content);
  }
  return next();
};

export { get, set };
