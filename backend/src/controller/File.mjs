import BaseController from './Base.mjs';
import { FileService } from '../service/File.mjs';
import path from 'path';

const { resolve } = path;

const __dirname = resolve();

class File extends BaseController {
  constructor() {
    super(File);
    this.getUserFiles = this.getUserFiles.bind(this);
    this.download = this.download.bind(this);
    this.__dirname = resolve();
  }

  async getUserFiles(req, res) {
    try {
      const files = await FileService.getUserFiles(req.id);
      return this.sendResponse(res, 200, { files });
    } catch {
      return this.sendResponse(res, 400, { error: 'Data not found' });
    }
  }

  async download(req, res) {
    try {
      return res.download(`${__dirname}/${req.query.path}`);
    } catch (error) {
      return this.sendResponse(res, 400, {
        error: 'Unable to download the file',
      });
    }
  }
}

const FileController = new File();

export default FileController;
