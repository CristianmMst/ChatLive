export class User {
  readonly id: string | undefined;
  readonly email: string;
  readonly username: string;
  readonly password: string | null;
  readonly googleId: string | null;

  constructor(
    email: string,
    username: string,
    password: string | null = null,
    googleId: string | null = null,
    id?: string,
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.googleId = googleId;
  }
}
