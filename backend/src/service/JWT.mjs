import jwt from 'jsonwebtoken';
import { Environment } from '../config/index.mjs';

const { ACCESS_SECRET, REFRESH_SECRET } = Environment.webToken;

export class JWTService {
  static getSecret(refresh) {
    return !refresh ? ACCESS_SECRET : REFRESH_SECRET;
  }

  static getExpires(refresh) {
    return !refresh ? '15m' : '7d';
  }

  static verifyToken(token, refresh = false) {
    try {
      return jwt.verify(token, JWTService.getSecret(refresh));
    } catch {
      throw new Error({ message: 'Invalid token...' });
    }
  }

  static signToken(payload, refresh = false) {
    return jwt.sign(payload, JWTService.getSecret(refresh), {
      expiresIn: JWTService.getExpires(refresh),
    });
  }
}
