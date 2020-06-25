import { propertyMap } from 'model-mapper';

export class Page {

  @propertyMap({ source: '_id' })
  public id: string;

  @propertyMap()
  public title: string;

  @propertyMap()
  public url: string;

  @propertyMap()
  public icon: string;

  @propertyMap({ type: [Page], default: [] })
  public subpages: Page[];

}
