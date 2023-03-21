import { createContext, useState } from "react";

const NavContext = createContext({});

export const NavProvider = ({ children }) => {
    const [activeNav, setActiveNav] = useState({});

    return (
        <NavContext.Provider value={{ activeNav, setActiveNav }}>
            {children}
        </NavContext.Provider>
    )
}

export default NavContext;