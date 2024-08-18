export class Message {
  readonly to: string;
  readonly from: string;
  readonly text: string;
  readonly image?: string;

  constructor(to: string, from: string, text: string, image?: string) {
    this.to = to;
    this.from = from;
    this.text = text;
    this.image = image;
  }
}
