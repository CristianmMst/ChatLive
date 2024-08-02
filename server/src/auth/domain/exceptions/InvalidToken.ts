export class InvalidToken extends Error {
  constructor(message: string = "Invalid token") {
    super(message);
    this.name = "InvalidToken";
  }
}
