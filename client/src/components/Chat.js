import React from "react";
import { useEffect, useState } from "react";

export default function Chat({ socket, username, room }) {
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    socket
      .off("receive_message")
      .on("receive_message", (data) =>
        setMessageList((list) => [...list, data])
      );
  }, [socket]);

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
    }
  };

  return (
    <div>
      <input
        onChange={(e) => setCurrentMessage(e.target.value)}
        placeholder="Type message..."
        onKeyDown={(e) => {
          e.key === "Enter" && sendMessage() && (e.target.value = "");
        }}
      />
      <button onClick={sendMessage}>Send</button>
      <h1>Messages: </h1>
      {messageList.map((data, i) => (
        <p key={i}>
          {data.message} at {data.time}
        </p>
      ))}
    </div>
  );
}
