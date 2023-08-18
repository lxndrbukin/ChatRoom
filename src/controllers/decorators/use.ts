import 'reflect-metadata';
import { MetadataKeys } from './types';
import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];
    middlewares.push(middleware);
    Reflect.defineMetadata(MetadataKeys.middleware, middlewares, target, key);
  };

}