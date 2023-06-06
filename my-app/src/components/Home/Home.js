import "./Home.css";
import { useNavigate, Link } from "react-router-dom";
import Tasks from "../Tasks/Tasks";
import Nav from "../Nav/Nav";
import Quotes from "../Quotes/Quotes";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const HOUSE_URL = "/houses/";

const Home = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  // thought here instead of "You are logged in!"
  return (
    <div className="page">
      <h1>Home</h1>
      <br />
      {/* <p>You are logged in!</p> 
      <br /> */}
      {/* <Tasks /> */}
      <br />
      {/* <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link> */}
      <Quotes />
      <Nav />
    </div>
  );
};

export default Home;
