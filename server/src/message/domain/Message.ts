export class Message {
  readonly to: string;
  readonly from: string;
  readonly message: string;

  constructor(to: string, from: string, message: string) {
    this.to = to;
    this.from = from;
    this.message = message;
  }
}
