import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Socket } from "socket.io";
import { Message } from "./entities/Message";
import { IOSession } from "./types/session";

export const getEvents = (
  socket: Socket,
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
) => {
  const session = (socket.request as any as IOSession).session;

  socket.on("sendMessage", (data) => {
    const message = em.create(Message, {
      from: session.userId,
      to: data.to.id,
      message: data.message,
    });

    em.persistAndFlush(message);

    if (data.to.socketId)
      socket.to(data.to.socketId).emit("privateMessage", message);
  });

  session.save();
};
