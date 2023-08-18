import 'reflect-metadata';
import { MetadataKeys } from './types';

export function bodyValidator(...keys: string[]) {
  return function (target: any, key: string) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
}