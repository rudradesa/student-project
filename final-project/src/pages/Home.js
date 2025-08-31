import { Link } from "react-router-dom";
function Home(){
    return(
        <div>
                <h1>This is first page</h1>
                <Link to={"/homescrenn"}>User</Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
        </div>
    )
}

export default Home;