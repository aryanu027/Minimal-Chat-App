import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Chat = ({ socket, roomId, user }) => {
  const [mes, setmes] = React.useState("");
  const [mlist, setmlist] = React.useState([]);
  const sendmes = async () => {
    if (mes !== "") {
      const messageData = {
        roomId: roomId,
        author: user,
        message: mes,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setmlist((list) => [...list, messageData]);
      setmes("");
    }
  };
  React.useEffect(() => {
    socket.on("recieved_message", (data) => {
      setmlist((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <>
      <div
        style={{
          padding: "10px",
          backgroundColor: "white",
          textAlign: "center",
          width: "300px",
          margin: "auto",
        }}
      >
        <h4
          style={{
            fontFamily: "'Karla', sans-serif",
            fontSize: 25,
            color: "#23ACCF",
          }}
        >
          Chat Room
        </h4>
        <ScrollToBottom>
          <div
            style={{
              height: "300px",
              border: "1px solid black",
              overflowY: "scroll",
              height: "400px",
            }}
          >
            {mlist.map((message) => {
              return (
                <>
                  {user === message.author ? (
                    <div>
                      <div
                        style={{
                          border: "1px solid black",
                          width: "279px",
                          height: "60px",
                          display: "flex",
                        }}
                      >
                        <div>
                          <h4
                            style={{
                              color: "red",
                              marginRight: "5px",
                              marginTop: "auto",
                              fontFamily: "'Karla', sans-serif",
                            }}
                          >
                            {message.author}
                          </h4>
                          <h3
                            style={{
                              fontFamily: "'Karla', sans-serif",
                            }}
                          >
                            {message.message}
                          </h3>
                        </div>
                        <div>
                          <p
                            style={{
                              color: "#23ACCF",
                              marginTop: "auto",
                              fontSize: "11px",
                            }}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          border: "1px solid black",
                          width: "279px",
                          height: "60px",
                          display: "flex",
                          backgroundColor: "linen",
                        }}
                      >
                        <div>
                          <h4
                            style={{
                              color: "green",
                              marginRight: "5px",
                              marginTop: "auto",
                              fontFamily: "'Karla', sans-serif",
                            }}
                          >
                            {message.author}
                          </h4>
                          <h3
                            style={{
                              fontFamily: "'Karla', sans-serif",
                            }}
                          >
                            {message.message}
                          </h3>
                        </div>
                        <div>
                          <p
                            style={{
                              color: "#23ACCF",
                              marginTop: "auto",
                              fontSize: "11px",
                            }}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </ScrollToBottom>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          style={{ width: "230px" }}
          maxRows={5}
          placeholder="Enter text"
          value={mes}
          onChange={(event) => {
            setmes(event.target.value);
          }}
        />
        <Button
          variant="contained"
          style={{
            height: 55,
          }}
          onClick={sendmes}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default Chat;
