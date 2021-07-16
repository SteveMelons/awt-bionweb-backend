import { User } from "./User";

export interface SocketUser {
  socketId: string;
  userId: string;
}

export interface Message {
  id: string;
  from: User;
  to: User;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
