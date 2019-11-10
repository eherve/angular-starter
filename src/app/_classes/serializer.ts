// tslint:disable: variable-name

export class Serializer {

  static deserialize<T>(type: new () => T, source: string): T {
    if (!source) { return null; }
    const data = JSON.parse(source);
    const target = new type();
    Object.keys(data).forEach((key) => {
      const targetKeys = Object.keys(target);
      if (targetKeys.indexOf(key) === -1) {
        target[key] = data[key];
      }
    });
    return target;
  }

  static serialize(source: any): string {
    const obj = {};
    for (const key in source) {
      if (source.hasOwnProperty(key)) { obj[key.toString()] = source[key]; }
    }
    return JSON.stringify(obj);
  }

}
