import crypto from 'crypto';
import { SingletonClass } from '../helpers/SingletonClass.mjs';
import util from 'util';
import { Environment } from '../config/index.mjs';

const { promisify } = util;

const { salt } = Environment;

const asyncScript = promisify(crypto.scrypt);

class Hash extends SingletonClass {
  constructor() {
    super(Hash);
  }

  async hash(value) {
    const hash = await asyncScript(value, salt, 64);
    return hash.toString('hex');
  }

  async compare(value, hashedValue) {
    const valueHashed = await this.hash(value);
    return valueHashed === hashedValue;
  }
}

export const HashService = new Hash();
