import BaseController from './Base.mjs';
import { ProfileService } from '../service/Profile.mjs';

class Profile extends BaseController {
  constructor() {
    super(Profile);
    this.getProfileData = this.getProfileData.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  async getProfileData(req, res) {
    try {
      const user = await ProfileService.getData(req.id);
      return this.sendResponse(res, 200, { user });
    } catch {
      return this.sendResponse(res, 400, { error: 'Data not found' });
    }
  }

  async updatePassword(req, res) {
    const { message, status } = await ProfileService.updatePassword(
      req.body,
      req.id
    );

    return this.sendResponse(res, status, { message });
  }
}

const ProfileController = new Profile();

export default ProfileController;
