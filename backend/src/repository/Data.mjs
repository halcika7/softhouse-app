import DataModel from '../model/Data.mjs';
import { SingletonClass } from '../helpers/SingletonClass.mjs';

class Data extends SingletonClass {
  constructor() {
    super(Data);
  }

  createUserData(userId) {
    return new DataModel({ userId }).save();
  }

  getUserData(userId) {
    return DataModel.findOne({ userId }).select('-_id data');
  }

  updateData(userId, data) {
    return DataModel.findOneAndUpdate({ userId }, { $push: { data: [data] } });
  }

  setUserData(userId, data = []) {
    return DataModel.updateOne({ userId }, { $set: { data } });
  }

  async remove(userId, index) {
    const userData = await this.getUserData(userId);
    const data = [...userData.data];
    data.splice(index, 1);

    return this.setUserData(userId, data);
  }
}

export const DataRepository = new Data();
