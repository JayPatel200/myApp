import "./Missing.css";
import { Link } from "react-router-dom"
import Nav from "../Nav/Nav";

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
            </div>
            <Nav/>
        </article>
    )
}

export default Missing;