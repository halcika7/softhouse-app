export class SingletonClass {
  constructor(ChildClass) {
    if (!ChildClass.instance) {
      // eslint-disable-next-line no-param-reassign
      ChildClass.instance = this;
    }

    return ChildClass.instance;
  }
}
