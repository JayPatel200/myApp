import "./Chatbox.css";
import io from "socket.io-client";
import { useEffect } from "react";
import Chat from "../Chat/Chat";
import Nav from "../Nav/Nav";
import useAuth from "../../hooks/useAuth";

const socket = io.connect("http://localhost:3001");

const Chatbox = () => {
  const { auth } = useAuth();

  useEffect(() => {
    socket.emit("join_room", auth?.currentHouse);
  }, []);

  return (
    <div className="Chatbox">
      <Chat
        socket={socket}
        room={auth.currentHouse}
        username={auth.user}
        house={auth.currentHouse}
      />
      <Nav />
    </div>
  );
};

export default Chatbox;