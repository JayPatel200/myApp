import { useContext, useDebugValue } from "react";
import NavContext from "../context/NavProvider";

const useNav = () => {
    const { activeNav } = useContext(NavContext);
    useDebugValue(activeNav, activeNav => activeNav ? "Active nav working." : "Active nav not working.")
    return useContext(NavContext);
}

export default useNav;