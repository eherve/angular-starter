// tslint:disable: variable-name

export class Serializer<T> {

  constructor(private type: new () => T) { }

  public serialize(source: T): string {
    const obj = {};
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        obj[key.toString()] = source[key];
      }
    }
    return JSON.stringify(obj);
  }

  public deserialize(source: string): T {
    if (!source) { return null; }
    const data = JSON.parse(source);
    const target = new this.type();
    Object.keys(data).forEach((key) => {
      const targetKeys = Object.keys(target);
      if (targetKeys.indexOf(key) === -1) {
        target[key] = data[key];
      }
    });
    return target;
  }
}
