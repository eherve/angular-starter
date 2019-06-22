export class User {

  public id: string;
  public username: string;
  public firstname: string;
  public lastname: string;

  public get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }

  static fromString(data: string): User {
    return data ? new User(JSON.parse(data)) : null;
  }

  constructor(data: any) {
    this.id = data.id;
    this.username = data.username;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
  }

  public toString(): string {
    return JSON.stringify(this);
  }

}
