interface UserProps {
  id?: string;
  email: string;
  username: string;
  avatar?: string | null;
  password?: string | null;
  googleId?: string | null;
}

export class User {
  readonly id: string | undefined;
  readonly email: string;
  readonly username: string;
  readonly avatar: string | null;
  readonly password: string | null;
  readonly googleId: string | null;

  constructor({
    id,
    email,
    username,
    avatar = null,
    password = null,
    googleId = null,
  }: UserProps) {
    this.id = id;
    this.email = email;
    this.avatar = avatar;
    this.username = username;
    this.password = password;
    this.googleId = googleId;
  }
}
