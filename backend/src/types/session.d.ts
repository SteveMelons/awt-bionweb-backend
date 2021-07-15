import "express-session";
import "socket.io";
export interface IOSession {
  session: {
    userId?: string;
    save: () => void;
  };
}
declare module "express-session" {
  interface Session {
    userId?: string;
  }
}
