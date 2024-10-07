export class UserAlreadyExists extends Error {
  constructor(message: string = "User already exists") {
    super(message);
    this.name = "UserAlreadyExists";
  }
}
