import BaseController from './Base.mjs';
import { DataService } from '../service/Data.mjs';

class Data extends BaseController {
  constructor() {
    super(Data);
    this.getUserData = this.getUserData.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
    this.removeFromData = this.removeFromData.bind(this);
    this.saveDataToFile = this.saveDataToFile.bind(this);
  }

  async getUserData(req, res) {
    try {
      const { data } = await DataService.getData(req.id);
      return this.sendResponse(res, 200, { data });
    } catch {
      return this.sendResponseMessage(res, 400, 'Data not found');
    }
  }

  async updateUserData(req, res) {
    try {
      await DataService.updateUserData(req.id, req.body.data);
      return this.sendResponse(res, 200, { message: 'Data updated' });
    } catch {
      return this.sendResponseMessage(res, 400, 'Data was not updated');
    }
  }

  async removeFromData(req, res) {
    try {
      await DataService.removeFromData(req.id, req.body.index);
      return this.sendResponse(res, 200, { message: 'User removed from data' });
    } catch {
      return this.sendResponseMessage(res, 400, 'User was not removed');
    }
  }

  async saveDataToFile(req, res) {
    try {
      const { message, status } = await DataService.saveDataToFile(
        req.id,
        req.body.data
      );

      return this.sendResponse(res, status, { message });
    } catch {
      return this.sendResponseMessage(res, 400, 'File was not saved ');
    }
  }
}

const DataController = new Data();

export default DataController;
