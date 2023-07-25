import React, { useState } from "react";
import Select from "./Select";
import useAuth from "../../hooks/useAuth";
import "./Dropdown.css";

const Dropdown = ({ options }) => {
  const [menuShow, setMenuShow] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const { setAuth } = useAuth();

  const selectOption = (e) => {
    setSelected(e.target.innerText);
    setAuth((prevState) => ({
      ...prevState,
      currentHouse: e.target.innerText
    }));
    setMenuShow(!menuShow);
  };

  const dropdownList = options.map((option, i) => (
    <li key={i} onClick={selectOption}>
      {option}
    </li>
  ));

  return (
    <div className="dropdown">
      <Select
        menuShow={menuShow}
        setMenuShow={setMenuShow}
        selected={selected}
      />
      <ul className={`menu ${menuShow && "menu-open"}`}>{dropdownList}</ul>
    </div>
  );
};

export default Dropdown;
