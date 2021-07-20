import { useTheme } from "@material-ui/core";
import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Message } from "../types/types";

interface ChatBubbleProps {
  message: Message;
  self?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ self, message }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: self
          ? theme.palette.primary.light
          : theme.palette.secondary.light,
        borderRadius: "12px",
        padding: "0.4em 1em",
        color: "#fff",
        fontSize: "0.6em",
        margin: "0.4em 1em",
        overflowWrap: "break-word",
      }}
    >
      <Typography>{message.message}</Typography>
      <Typography fontSize="1.1em">
        {new Date(message.createdAt).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default ChatBubble;
