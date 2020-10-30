import FileModel from '../model/File.mjs';
import { SingletonClass } from '../helpers/SingletonClass.mjs';

class File extends SingletonClass {
  constructor() {
    super(File);
  }

  createFile({ userId, path, fileSize, name }) {
    return new FileModel({ userId, path, fileSize, name }).save();
  }

  getUserFiles(userId) {
    return FileModel.find({ userId }).select('-_id -updatedAt -userId');
  }
}

export const FileRepository = new File();
