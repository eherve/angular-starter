// tslint:disable: variable-name
import { isEqual, cloneDeep, get, merge } from 'lodash';
import * as moment from 'moment';
import { IOptions, Type } from '../_decorators/property-map.decorator';

export abstract class ModelMapper {

  private _initials: { [property: string]: any };

  constructor(data?: any) { if (data) { this.map(data); } }

  private get _propertyMapping(): { [key: string]: IOptions } {
    return (this.constructor as any)._propertyMap;
  }

  public getPropertySource(property: string): string | string[] {
    const mapping = this._propertyMapping[property];
    return mapping ? mapping.source : null;
  }

  public isPropertyDirty(property: string): boolean {
    const mapping = this._propertyMapping[property];
    if (!mapping || !mapping.trace) { return null; }
    return this[property].equals ? this[property].equals(this._initials[property]) :
      !isEqual(this[property], this._initials[property]);
  }

  public getDirtyProperties(): string[] {
    const properties: string[] = [];
    for (const property in this._propertyMapping) {
      if (this._propertyMapping.hasOwnProperty(property)) {
        if (this.isPropertyDirty(property)) { properties.push(property); }
      }
    }
    return properties;
  }

  public resetDirty() {
    Object.keys(this._propertyMapping).forEach(key => {
      const mapping = this._propertyMapping[key];
      if (mapping.trace) {
        this._initials[key] = this[key].clone ? this[key].clone() : cloneDeep(this[key]);
      }
    });
  };

  public merge(source: any, resetDirty = false): this {
    merge(this, source);
    if (resetDirty) { this.resetDirty(); }
    return this;
  }

  public map(source): this {
    if (!source) { return; }
    Object.keys(this._propertyMapping).forEach(property => {
      const mapping = this._propertyMapping[property];

      if (Array.isArray(mapping.type)) {
        this[property] = (get(source, mapping.source) || []).
          map(value => this.getValue(source, property, mapping, mapping.type[0], value));
      } else {
        const value = mapping.source ? (mapping.source === '.' ? source : get(source, mapping.source)) : undefined;
        this[property] = this.getValue(source, property, mapping, mapping.type, value);
      }

      if (mapping.default !== undefined && this[property] === undefined) {
        this[property] = mapping.default;
      }

      if (mapping.trace) {
        this._initials = this._initials || {};
        this._initials[property] = this[property].clone ? this[property].clone() : cloneDeep(this[property]);
      }
    });
    return this;
  }

  protected getValue(source: any, property: string, mapping: IOptions, type: Type, value: any) {
    if (type === 'Moment') {
      return this.buildMoment(source, property, mapping, value);
    }
    if (type) {
      return new type(source === '.' ? source : value);
    }
    return value;
  }

  protected buildMoment(source: any, property: string, mapping: IOptions, value: any): moment.Moment {
    return value ? moment(value) : undefined;
  }

}
