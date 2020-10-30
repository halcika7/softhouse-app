class BaseService {
  constructor(ChildClass) {
    if (!ChildClass.instance) {
      // eslint-disable-next-line no-param-reassign
      ChildClass.instance = this;
    }

    return ChildClass.instance;
  }

  returnFailedMessage(
    message = 'Something happened. We were unable to perform request.'
  ) {
    return { status: 400, message };
  }

  returnResponse(status, objectResp) {
    return { status, ...objectResp };
  }
}

export default BaseService;
