import "./Chatbox.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "../Chat/Chat";
import Nav from "../Nav/Nav";
import useAuth from '../../hooks/useAuth';

const socket = io.connect("http://localhost:3001");

const Chatbox = () => {
  const [username, setUsername] = useState("");
  const { auth } = useAuth();

  useEffect(() => {
    socket.emit("join_room", process.env.REACT_APP_CHATROOM_SECRET);
  }, []);

  return (
    <div className="Chatbox">
      <Chat socket={socket} room={process.env.REACT_APP_CHATROOM_SECRET} username={auth.user} />
      <Nav />
    </div>
  );
};

export default Chatbox;