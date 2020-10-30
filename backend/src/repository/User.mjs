import UserModel from '../model/User.mjs';
import { SingletonClass } from '../helpers/SingletonClass.mjs';
import { Environment } from '../config/index.mjs';
import { HashService } from '../service/Hash.mjs';

const { img } = Environment;

class User extends SingletonClass {
  constructor() {
    super(User);
  }

  hashPasword(password) {
    return HashService.hash(password);
  }

  createUser(data) {
    return new UserModel({ ...data }).save();
  }

  findByEmail(email) {
    return UserModel.findOne({ email });
  }

  findById(id, includePrevious = true) {
    return UserModel.findById(id).select(
      `username picture email hasPassword createdAt ${
        includePrevious ? 'previousPasswords' : ''
      }`
    );
  }

  findByEmailOrUsername(value) {
    return UserModel.findOne({ $or: [{ email: value }, { username: value }] });
  }

  findUserForSocial(email, githubId, username) {
    return UserModel.findOne({ $or: [{ email }, { username, githubId }] });
  }

  async createUserOnRegistration({
    password,
    username,
    email,
    name,
    githubId,
    picture,
  }) {
    const hash = await this.hashPasword(password);
    const userData = {
      password: hash,
      username,
      email,
      picture: picture || img,
      name,
      githubId,
      previousPasswords: [hash],
    };

    return this.createUser(userData);
  }

  getUserHash(password, id) {
    return Promise.all([this.findById(id), this.hashPasword(password)]);
  }
}

export const UserRepository = new User();
