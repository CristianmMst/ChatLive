export interface User {
  id: string;
  email: string;
  token?: string;
  password?: string;
  username?: string;
  googleId?: string;
}

export interface UserLocal {
  email: string;
  password: string;
  username?: string;
  googleId?: string;
}
