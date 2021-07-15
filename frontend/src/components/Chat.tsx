import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SocketUser } from "../types/types";

interface ChatProps {}

const Chat: React.FC<ChatProps> = ({}) => {
  const [usersState, setUsersState] = useState<SocketUser[]>([]);

  useEffect(() => {
    const socket = io({ path: "/ws" });

    socket.on("users", (users) => {
      setUsersState(users);
    });

    socket.on("user connected", (user: SocketUser) => {
      setUsersState((prev) => [user, ...prev]);
    });

    socket.on("user disconnected", (user: SocketUser) => {
      setUsersState((prev) => prev.filter((el) => el.userId !== user.userId));
    });
  }, []);
  return (
    <>
      {usersState.map((user) => (
        <span key={user.socketId}>
          {user.userId} : {user.socketId}
        </span>
      ))}
    </>
  );
};

export default Chat;
