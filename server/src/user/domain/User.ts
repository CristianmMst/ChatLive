export interface Contacts {
  id: string;
  username: string;
}

export class User {
  readonly id: string | undefined;
  readonly email: string;
  readonly username: string;
  readonly password: string;

  constructor(email: string, username: string, password: string, id?: string) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
