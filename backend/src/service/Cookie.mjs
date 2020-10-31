import { Environment } from '../config/index.mjs';

const { REFRESH_TOKEN_NAME, REFRESH_TOKEN_PATH } = Environment.webToken;

const refreshOptions = {
  httpOnly: true,
  path: REFRESH_TOKEN_PATH,
  secure: Environment.environment === 'production',
};

export class CookieService {
  static setRefreshToken(res, token) {
    res.cookie(REFRESH_TOKEN_NAME, token, refreshOptions);
  }

  static removeRefreshToken(res) {
    res.cookie(REFRESH_TOKEN_NAME, '', refreshOptions);
  }
}
