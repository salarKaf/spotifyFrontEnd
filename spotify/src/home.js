import React, { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { useEffect } from "react";
import { validateUser } from "./API/userAPIservice";

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("N/A");
    const [phone, setPhone] = useState("N/A");

    useEffect(() => {
        let token = localStorage.getItem('token')

        if (!token) {
            navigate("/login");
        }

        (async () => {
            let result = await validateUser(token);

            if (result.success) {
                setUsername(result.data.username);
                setEmail(result.data.email ?? "N/A");
                setPhone(result.data.phoneNumber);
            } else {
                console.log("Failed to validate user");
                navigate("/login");
            }
        })()
    }, [navigate]);

    let usernameTag = (<></>)

    if (username == "" || username == null) {
        usernameTag = (<Link to="/setpassword" className="btn btn-primary">Set Username Password</Link>)
    } else {
        usernameTag = (<h3>username: {username}</h3>)
    }

    return (
        <div>
            <h1>Login was successful</h1>
            <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
            <br></br>
            <h1>user details</h1>
            <h3>phone: {phone}</h3>
            {usernameTag}
            <h3>email: {email}</h3>

        </div>
    );
};

export default Home;
