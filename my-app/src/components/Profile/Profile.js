import React from "react";
import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import Nav from "../Nav/Nav";

const LOGOUT_URL = "/logout";

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const userRef = useRef();
  const [house, setHouse] = useState("");
  const [user, setUser] = useState("");

  const logout = async () => {
    // if used in more components, this should be in context
    try {
      const response = await axios.get(LOGOUT_URL, {
        headers: {
          Authorization: "Bearer " + auth.accessToken,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setAuth({});
    } catch (err) {

    }
  };

  return (
    <div className="page">
      <div>
        <h1>Profile</h1>
      </div>
      <div>
        <label htmlFor="housename">Housename:</label>
        <input
          type="text"
          id="housename"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setHouse(e.target.value)}
          value={house}
          required
        />
        <button>Build a house</button>
        <br/>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <button>Add tenants to the house</button>
      </div>
      <div>
        {/* <h1>Links</h1>
        <br />
        <Link to="/editor">Editors Page</Link>
        <br />
        <Link to="/admin">Admin Page</Link> */}
        <div className="flexGrow">
          <button onClick={logout}>Sign Out</button>
        </div>
        <Nav />
      </div>
    </div>
  );
};

export default Profile;
