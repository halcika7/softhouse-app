import BaseService from './Base.mjs';
import { DataRepository } from '../repository/Data.mjs';
import { FileService } from './File.mjs';

class Data extends BaseService {
  constructor() {
    super(Data);
  }

  getData(id) {
    return DataRepository.getUserData(id);
  }

  updateUserData(id, data) {
    return DataRepository.updateData(id, data);
  }

  removeFromData(loggedUserId, index) {
    return DataRepository.remove(loggedUserId, index);
  }

  async saveDataToFile(userId, data) {
    const {
      path,
      name,
      fileSize,
      status,
      message,
    } = await FileService.saveDataToFile(userId, data);

    if (status) return this.returnResponse(status, { message });

    try {
      await Promise.all([
        FileService.saveFileInfoToDatabase({ userId, path, name, fileSize }),
        DataRepository.setUserData(userId, []),
      ]);
      return this.returnResponse(200, { message: 'File save' });
    } catch {
      return this.returnFailedMessage();
    }
  }
}

export const DataService = new Data();
