import * as crypto from 'crypto';
import util from 'util';

const scrypt = util.promisify(crypto.scrypt);

export async function createPassword(suppliedPassword: string): Promise<string> {
  const salt = crypto.randomBytes(8).toString('hex');
  const password: any = await scrypt(suppliedPassword, salt, 64);
  return `${password.toString('hex')}.${salt}`;
}

export async function comparePasswords(savedPassword: string, suppliedPassword: string): Promise<boolean> {
  const [hashed, salt] = savedPassword.split('.');
  const hashedSupplied: any = await scrypt(suppliedPassword, salt, 64);
  return hashed === hashedSupplied.toString('hex');
}

export async function checkPassword(password: string): Promise<boolean> {
  if (password.length >= 4 && password.length <= 20) {
    return true;
  } else {
    return false;
  }
}