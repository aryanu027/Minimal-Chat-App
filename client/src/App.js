import "./App.css";
import io from "socket.io-client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001");
function App() {
  const [oad, setoad] = React.useState("open");
  const [user, setuser] = React.useState("");
  const [roomId, setroomId] = React.useState("");
  const joinRoom = () => {
    if (user !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
      setoad("close");
    }
  };
  return (
    <>
      {oad === "open" ? (
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h4
            style={{
              fontFamily: "'Karla', sans-serif",
              fontSize: 50,
              fontWeight: "heavy",
              color: "white",
            }}
          >
            Join Chat Room
          </h4>
          <TextField
            id="outlined-basic"
            label="Name"
            inputProps={{ style: { color: "white" } }}
            variant="filled"
            onChange={(event) => {
              setuser(event.target.value);
            }}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Room ID"
            inputProps={{ style: { color: "white" } }}
            variant="filled"
            onChange={(event) => {
              setroomId(event.target.value);
            }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            style={{
              color: "black",
              backgroundColor: "white",
            }}
            onClick={joinRoom}
          >
            Join Room
          </Button>
        </div>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <Chat socket={socket} roomId={roomId} user={user} />
        </div>
      )}
    </>
  );
}

export default App;
