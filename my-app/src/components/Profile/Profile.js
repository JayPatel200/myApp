import React from "react";
import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import Nav from "../Nav/Nav";
import Dropdown from "../Dropdown/Dropdown";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const LOGOUT_URL = "/logout";
const HOUSE_URL = "/houses";

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const userRef = useRef();
  const [house, setHouse] = useState("");
  const [addUser, setAddUser] = useState("");
  const [removeUser, setRemoveUser] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const owner = auth.user;

  const buildNewHouse = async (e) => {
    try {
      const response = await axiosPrivate.post(HOUSE_URL, JSON.stringify({house, owner}), {
        headers: {
          Authorization: "Bearer " + auth.accessToken,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (err) {
      
    }
  };

  const addTenant = async (e) => {
    try {
      
    } catch (err) {
      
    }
  };

  const removeTenant = async (e) => {
    try {
      
    } catch (err) {
      
    }
  };

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
      <Dropdown options={auth?.houses} />
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
        <button onClick={buildNewHouse} >Build a house</button>
        <br/>

        <label htmlFor="addUsername">Username:</label>
        <input
          type="text"
          id="addUsername"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setAddUser(e.target.value)}
          value={addUser}
          required
        />
        <button onClick={addTenant} >Add a tenant to the house</button>
        <br/>

        <label htmlFor="removeUsername">Username:</label>
        <input
          type="text"
          id="removeUsername"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setRemoveUser(e.target.value)}
          value={removeUser}
          required
        />
        <button onClick={removeTenant} >Remove a tenant from the house</button>
      </div>
      <div>
        <div className="flexGrow">
          <button onClick={logout}>Sign Out</button>
        </div>
        <Nav />
      </div>
    </div>
  );
};

export default Profile;
