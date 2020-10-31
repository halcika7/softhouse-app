import BaseController from './Base.mjs';
import { AuthService } from '../service/Auth.mjs';
import { CookieService } from '../service/Cookie.mjs';
import { JWTService } from '../service/JWT.mjs';
import { Environment } from '../config/index.mjs';

const { webToken } = Environment;

class Auth extends BaseController {
  constructor() {
    super(Auth);
    this.tokensHelper = this.tokensHelper.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  tokensHelper(res, accessToken, refreshToken) {
    CookieService.setRefreshToken(res, refreshToken);
    return res.status(200).json({ accessToken });
  }

  async login(req, res) {
    const user = await AuthService.findUser(req.body.username);
    const { accessToken, refreshToken } = await AuthService.login(user._id);

    return this.tokensHelper(res, accessToken, refreshToken);
  }

  async register(req, res) {
    const {
      accessToken,
      refreshToken,
      status,
      message,
    } = await AuthService.register(req.body);

    if (message) {
      return this.sendResponseMessage(res, status, message);
    }

    return this.tokensHelper(res, accessToken, refreshToken);
  }

  async refreshToken(req, res) {
    const status = req.query.first ? 200 : 401;
    const token = req.cookies[webToken.REFRESH_TOKEN_NAME];

    try {
      const user = await JWTService.verifyToken(token, true);
      const { accessToken, refreshToken } = await AuthService.login(user.id);

      return this.tokensHelper(res, accessToken, refreshToken);
    } catch {
      return this.sendResponse(res, status, {});
    }
  }

  logout(req, res) {
    if (req.logout) {
      req.logout();
    }
    CookieService.removeRefreshToken(res);
    return this.sendResponse(res, 200, {});
  }
}

const AuthController = new Auth();

export default AuthController;
