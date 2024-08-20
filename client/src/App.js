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
    <Container maxWidth="sm">
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
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
              Live Chat
            </Typography>
            <TextField
              label="Your name"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Typography variant="body1" sx={{ color: "grey", mt: 3 }}>
              Join a public OR Create a private chat and share it others
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select a public chat room</InputLabel>
              <Select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                label="Select a public chat room"
                placeholder="Select a room"
              >
                <MenuItem value={"Gaming"}>Gaming</MenuItem>
                <MenuItem value={"Tech"}>Tech</MenuItem>
                <MenuItem value={"Real estate"}>Real estate</MenuItem>
                <MenuItem value={"Social media"}>Social media</MenuItem>
                <MenuItem value={"Fitness"}>Fitness</MenuItem>
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
