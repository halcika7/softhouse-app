import BaseService from './Base.mjs';
import { FileRepository } from '../repository/File.mjs';
import util from 'util';
import fs from 'fs';
import Path from 'path';

const { mkdir, writeFile, access, stat } = fs;
const { promisify } = util;
const { join, resolve } = Path;

const makeDir = promisify(mkdir);
const write = promisify(writeFile);
const exists = promisify(access);
const fileStats = promisify(stat);

const __dirname = resolve();

const createDirectory = async name => {
  const path = join(__dirname, name);
  try {
    await exists(path);
  } catch {
    await makeDir(path);
  }
  return path;
};

const writeJsonFile = async (name, data) => write(name, data);

class File extends BaseService {
  constructor() {
    super(File);
  }

  async saveDataToFile(userId, data) {
    try {
      await createDirectory('files');
      const directoryPath = await createDirectory(`files/${userId}`);
      const name = `${new Date().getTime() * Math.random()}.json`;
      const path = `${directoryPath}/${name}`;
      await writeJsonFile(path, data);
      const { size } = await fileStats(path);
      return {
        path: `files/${userId}/${name}`,
        name,
        fileSize: size / 1000,
      };
    } catch {
      return this.returnFailedMessage('File was not saved');
    }
  }

  saveFileInfoToDatabase(info) {
    return FileRepository.createFile(info);
  }

  getUserFiles(userId) {
    return FileRepository.getUserFiles(userId);
  }
}

export const FileService = new File();
