import "./App.css";
import React, { useState } from "react";
import io from "socket.io-client";
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Paper,
} from "@mui/material";
import Chat from "./views/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { room, username });
      setShowChat(true);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        {!showChat ? (
          <Paper elevation={3} sx={{ padding: 5 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
              💬 Chat Stream
            </Typography>
            <Typography variant="body1" sx={{ color: "grey", mb: 2 }}>
              An instant message app that integrates with your business
            </Typography>
            <TextField
              label="Your name"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Typography variant="body1" sx={{ color: "grey", mt: 3 }}>
              Join a channel OR private chat
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Choose a channel</InputLabel>
              <Select
                label="Choose a channel"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              >
                <MenuItem value={"Healthcare"}>Healthcare</MenuItem>
                <MenuItem value={"Tradesman"}>Tradesman</MenuItem>
                <MenuItem value={"E-commerce"}>E-commerce</MenuItem>
                <MenuItem value={"Internal team"}>Internal team</MenuItem>
                <MenuItem value={"Real estate"}>Real estate</MenuItem>
                <MenuItem value={"Personal trainer"}>Personal trainer</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Create a private chat"
              variant="outlined"
              onChange={(e) => setRoom(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={joinRoom}
              sx={{ mt: 3 }}
            >
              Join room
            </Button>
          </Paper>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </Box>
    </Container>
  );
}

export default App;
