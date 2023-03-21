import React, { useContext } from "react";
import "./nav.css";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { RiServiceLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import useNav from "../../hooks/useNav";

const Nav = () => {
  const {activeNav, setActiveNav} = useNav();
  const navigate = useNavigate();

  return (
    <nav>
      <Link
        to ="/"
        className={activeNav === "/" ? "active" : ""}
        onClick={() => navigate(setActiveNav("/"), { replace: true })}
      >
        <AiOutlineHome />
      </Link>
      <Link
        to ="/calendar"
        className={activeNav === "/calendar" ? "active" : ""}
        onClick={() => navigate(setActiveNav("/calendar"), { replace: true })}
      >
        <AiOutlineUser />
      </Link>
      <Link
        to = "/schedule"
        className={activeNav === "/schedule" ? "active" : ""}
        onClick={() => setActiveNav("/schedule")}
      >
        <BiBook />
      </Link>
      <Link
        to ="/chatbox"
        className={activeNav === "/chatbox" ? "active" : ""}
        onClick={() => setActiveNav("/chatbox")}
      >
        <RiServiceLine />
      </Link>
      <Link
        to ="/profile"
        className={activeNav === "/profile" ? "active" : ""}
        onClick={() => setActiveNav("/profile")}
      >
        <BiMessageSquareDetail />
      </Link>
    </nav>
  );
};

export default Nav;
