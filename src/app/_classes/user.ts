import { propertyMap } from '../_decorators/property-map.decorator';

export class User {

  @propertyMap()
  public id: string;

  @propertyMap()
  public username: string;

  @propertyMap()
  public firstname: string;

  @propertyMap()
  public lastname: string;

  public get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }

}
