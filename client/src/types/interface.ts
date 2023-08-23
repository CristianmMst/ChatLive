export interface Message {
  from: string;
  message: string;
}

export interface Error {
  response: {
    data: string;
  };
}
