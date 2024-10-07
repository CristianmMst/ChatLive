export interface IContact {
  id: string;
  username: string;
  avatar: string | null;
  lastMessage?: {
    message: {
      text: string;
    };
    createdAt: Date;
  };
}
