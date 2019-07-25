// tslint:disable: variable-name

export class ModelMapper<T> {
  _propertyMapping: { [key: string]: { source?: string, default?: any } };
  _target: any;
  constructor(type: new () => T) {
    this._target = new type();
    this._propertyMapping = this._target.constructor._propertyMap || {};
  }

  map(source): T {
    Object.keys(this._propertyMapping).forEach(key => {
      const options = this._propertyMapping[key];
      const mappedKey = options.source || key;
      this._target[key] = source[mappedKey];
      if (options.default && this._target[key] === undefined) {
        this._target[key] = options.default;
      }
    });
    return this._target;
  }
}
