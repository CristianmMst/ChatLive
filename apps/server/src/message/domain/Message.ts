export class Message {
  readonly to: string;
  readonly from: string;
  readonly text?: string | null;
  readonly image?: string | null;
  readonly createdAt?: Date;

  constructor(
    to: string,
    from: string,
    text?: string | null,
    image?: string | null,
    createdAt?: Date,
  ) {
    this.to = to;
    this.from = from;
    this.text = text ?? undefined;
    this.image = image ?? undefined;
    this.createdAt = createdAt;
  }
}
