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
      to: data.to,
      message: data.message,
    });

    em.persistAndFlush(message);
  });

  socket.on("openChat", async (data) => {
    const otherMessages = await em.find(Message, {
      $and: [{ from: data.to }, { to: session.userId }],
    });
    const myMessages = await em.find(Message, {
      $and: [{ to: data.to }, { from: session.userId }],
    });

    socket.emit("openChatRes");
  });

  session.save();
};
