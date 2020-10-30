import BaseService from './Base.mjs';
import { UserRepository } from '../repository/User.mjs';
import { DataRepository } from '../repository/Data.mjs';
import { JWTService } from './JWT.mjs';

class Auth extends BaseService {
  constructor() {
    super(Auth);
  }

  findUser(user) {
    return UserRepository.findByEmailOrUsername(user);
  }

  login(id) {
    return this.returnResponse(200, {
      accessToken: JWTService.signToken({ id }),
      refreshToken: JWTService.signToken({ id }, true),
    });
  }

  async register(data) {
    try {
      const user = await UserRepository.createUserOnRegistration(data);
      DataRepository.createUserData(user._id);

      return this.login(user._id);
    } catch (error) {
      return this.returnFailedMessage();
    }
  }
}

export const AuthService = new Auth();
