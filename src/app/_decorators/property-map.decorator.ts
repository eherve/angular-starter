export function propertyMap(options: { source?: string, default?: any } = {}) {
  return (target: any, propertyKey: string) => {
    if (!target.constructor._propertyMap) { target.constructor._propertyMap = {}; }
    target.constructor._propertyMap[propertyKey] = {
      source: options.source || propertyKey,
      default: options.default
    };
  };
}
