import { propertyMap } from '../_decorators/property-map.decorator';
import { ModelMapper } from './model-mapper';

export class UserRight extends ModelMapper {

  @propertyMap()
  public name: string;

}

export class User extends ModelMapper {

  @propertyMap()
  public id: string;

  @propertyMap()
  public username: string;

  @propertyMap()
  public firstname: string;

  @propertyMap()
  public lastname: string;

  @propertyMap({ type: [UserRight] })
  public rights: UserRight[];

  public get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }

}
