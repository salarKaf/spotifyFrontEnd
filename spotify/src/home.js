import React from "react";
import { useNavigate  , } from "react-router-dom";
import  { useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        let token = localStorage.getItem('token')

        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div>
            <h1>Login was successful</h1>
            <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
        </div>
    );
};

export default Home;
