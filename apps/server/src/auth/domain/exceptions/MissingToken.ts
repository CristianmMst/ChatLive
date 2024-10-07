export class MissingToken extends Error {
  constructor(message: string = "Missing access token") {
    super(message);
    this.name = "MissingToken";
  }
}
