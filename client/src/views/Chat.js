import React, { useEffect, useState, useRef } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  Divider,
} from "@mui/material";
import { LiveBlinker } from "../components/LiveBlinker";

export default function Chat({ socket, username, room }) {
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const endOfMessagesRef = useRef(null); // For auto-scrolling

  useEffect(() => {
    socket
      .off("receive_message")
      .on("receive_message", (data) =>
        setMessageList((list) => [...list, data])
      );
  }, [socket]);

  useEffect(() => {
    // Auto-scroll to the bottom when new messages arrive
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: username,
        room: room,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        height: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", m: 2, color: "grey" }}>
        <LiveBlinker color="green" /> Live Chat in {room}
      </Typography>
      <Divider />
      <hr />
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          paddingRight: 1,
          paddingBottom: 1,
        }}
      >
        {messageList.map((data, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              justifyContent:
                data.author === username ? "flex-end" : "flex-start",
              marginBottom: 1,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  padding: 1,
                  borderRadius: 3,
                  backgroundColor:
                    data.author === username ? "#007bff" : "#28a745", // Blue for sent, green for received
                  color: "#fff", // White text color
                  wordBreak: "break-word",
                }}
              >
                <Typography variant="body2" gutterBottom>
                  {data.message}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  fontWeight={"bold"}
                  sx={{ mr: 1 }}
                >
                  {data.author}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {data.time}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <div ref={endOfMessagesRef} /> {/* For auto-scrolling */}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: 1,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Type message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          fullWidth
          sx={{ mr: 1 }}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Card>
  );
}
