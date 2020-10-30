class BaseController {
  constructor(ChildClass) {
    if (!ChildClass.instance) {
      // eslint-disable-next-line no-param-reassign
      ChildClass.instance = this;
    }

    return ChildClass.instance;
  }

  sendResponseMessage(res, status, message) {
    return res.status(status).json({ message });
  }

  sendResponse(res, status, resObj) {
    return res.status(status).json({ ...resObj });
  }
}

export default BaseController;
