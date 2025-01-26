import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [command, setCommand] = useState("");
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    socket.on("robot-response", (data) => {
      setResponses((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  const sendCommand = () => {
    if (command.trim()) {
      socket.emit("robot-command", command);
      setCommand("");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Socket Robotics Control</h1>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter robot command"
      />
      <button onClick={sendCommand}>Send Command</button>
      <ul>
        {responses.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
