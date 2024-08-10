import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => setMessageReceived(data.message));
  }, [socket]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  return (
    <div className="App">
      <input
        placeholder="Room number.."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join room</button>
      <br />
      <input
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        onBlur={(e) => (e.target.value = "")}
      />
      <button onClick={sendMessage}>Send</button>
      <h1>Message: {messageReceived}</h1>
    </div>
  );
}

export default App;
