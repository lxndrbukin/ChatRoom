import 'reflect-metadata';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Router } from '../../router';
import { Methods } from './types';
import { MetadataKeys } from './types';

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).json({ message: 'Invalid request' });
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {

        res.status(422).json({ message: `Please enter your ${key}` });
        return;
      } else if (req.body[key] === 'email') {
        res.send('Email already in use');
        return;
      }
    }
    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = Router.getInstance();
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
      const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];
      const validator = bodyValidators(requiredBodyProps);
      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
      }
    }
  };
}