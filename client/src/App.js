import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";

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
    <div className="App">
      {!showChat ? (
        <>
          <input
            placeholder="Your name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <p>Join a public room</p>
          <select onChange={(e) => setRoom(e.target.value)}>
            <option value={""}>Select a room</option>
            <option value={"Gaming"}>Gaming</option>
            <option value={"Tech"}>Tech</option>
            <option value={"Real estate"}>Real estate</option>
            <option value={"Social media"}>Social media</option>
            <option value={"Fitness"}>Fitness</option>
          </select>
          <p>
            Or create your own room and share it with your friends to chat with
            them
          </p>
          <input
            placeholder="Create a room"
            onChange={(e) => setRoom(e.target.value)}
            style={{ marginBottom: "30px" }}
          />
          <br />
          <button onClick={joinRoom}>Join room</button>
        </>
      ) : (
        <div>
          <Chat socket={socket} username={username} room={room} />
        </div>
      )}
    </div>
  );
}

export default App;
