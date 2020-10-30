import BaseService from './Base.mjs';
import { UserRepository } from '../repository/User.mjs';

class Profile extends BaseService {
  constructor() {
    super(Profile);
  }

  getData(id) {
    return UserRepository.findById(id, false);
  }

  async updatePassword({ password }, id) {
    try {
      const [user, hash] = await UserRepository.getUserHash(password, id);
      const passwords = [...user.previousPasswords];

      if (passwords.includes(hash)) {
        return this.returnFailedMessage('Please do not use last 3 passwords');
      }

      passwords.unshift(hash);

      user.password = hash;
      user.previousPasswords =
        passwords.length > 3 ? passwords.slice(0, 3) : passwords;

      await user.save();

      return this.returnResponse(200, {
        message: !passwords.length
          ? 'Password added successfully'
          : 'Password updated',
      });
    } catch {
      return this.returnFailedMessage();
    }
  }
}

export const ProfileService = new Profile();
