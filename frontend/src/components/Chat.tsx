import {
  Box,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import { ArrowUpwardRounded, CloseRounded, Send } from "@material-ui/icons";
import React, { createRef, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getMessages, useMe } from "../api";
import { __apiUrl__, __prod__, __socketPath__ } from "../constants";
import { Message, SocketUser } from "../types/types";
import ChatBubble from "./ChatBubble";

interface ChatProps {
  profileId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chat: React.FC<ChatProps> = ({ profileId, open, setOpen }) => {
  const [{ data: meData }] = useMe();
  const [onlineUsersState, setOnlineUsersState] = useState<SocketUser[]>([]);
  const [messagesState, setMessagesState] = useState<Message[]>([]);

  const [socketState, setSocketState] = useState<Socket>();

  const scrollRef = createRef<HTMLInputElement>();

  useEffect(() => {
    let mounted = true;

    getMessages({ profileId }).then((res) => {
      setMessagesState(res.data);
    });

    const socket = io(__prod__ ? "/" : __apiUrl__, {
      path: __socketPath__,
      withCredentials: true,
    });

    setSocketState(socket);

    socket.on("users", (users) => {
      if (mounted) setOnlineUsersState(users);
    });

    socket.on("user connected", (user: SocketUser) => {
      if (mounted) setOnlineUsersState((prev) => [user, ...prev]);
    });

    socket.on("privateMessage", (data: Message) => {
      if (mounted && data.from.id === profileId)
        setMessagesState((prev) => [data, ...prev]);
    });

    socket.on("user disconnected", (user: SocketUser) => {
      if (mounted)
        setOnlineUsersState((prev) => {
          return [...prev.filter((el) => el.userId !== user.userId)];
        });
    });

    return () => {
      mounted = false;
      socket.offAny();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const theme = useTheme();

  const [inputState, setInputState] = useState("");

  return (
    <>
      {meData && (
        <Box
          sx={{ width: "100%", height: open ? "100%" : undefined }}
          display="flex"
          flexDirection="column"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              height: "3em",
              background: theme.palette.primary.main,
              color: "#fff",
              padding: "0 1em",
            }}
          >
            <Typography color="inherit" fontSize="1.3em" variant="body1">
              Chat
            </Typography>
            {open ? (
              <IconButton color="inherit" onClick={() => setOpen(false)}>
                <CloseRounded fontSize="medium" color="inherit" />
              </IconButton>
            ) : (
              <IconButton color="inherit" onClick={() => setOpen(true)}>
                <ArrowUpwardRounded fontSize="medium" color="inherit" />
              </IconButton>
            )}
          </Box>
          {open && (
            <>
              <Box
                sx={{ width: "100%", flex: "1", overflowY: "auto" }}
                display="flex"
                flexDirection="column-reverse"
                justifyContent="end"
              >
                <div
                  style={{ float: "left", clear: "both" }}
                  ref={scrollRef}
                ></div>
                {messagesState.map((message) => {
                  const self = message.from.id === meData.id;
                  return (
                    <Box
                      key={JSON.stringify(message)}
                      sx={{
                        alignSelf: self ? "flex-end" : "flex-start",
                        maxWidth: "85%",
                      }}
                    >
                      <ChatBubble message={message} self={self} />
                    </Box>
                  );
                })}
              </Box>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  socketState?.emit("sendMessage", {
                    to: {
                      id: profileId,
                      socketId: onlineUsersState.find(
                        (user) => user.userId === profileId
                      )?.socketId,
                    },
                    message: inputState,
                  });

                  setMessagesState((prev) => [
                    {
                      message: inputState,
                      createdAt: new Date().getUTCMilliseconds(),
                      from: { id: meData.id },
                    } as any,
                    ...prev,
                  ]);

                  setInputState("");
                }}
              >
                <Box display="flex" gap="0.5em" padding="0.5em">
                  <TextField
                    size="small"
                    variant="filled"
                    sx={{ flex: "1" }}
                    value={inputState}
                    onChange={(e) => {
                      setInputState(e.target.value);
                    }}
                  />
                  <IconButton type="submit">
                    <Send color="primary" />
                  </IconButton>
                </Box>
              </form>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default Chat;
