import React, {useContext, useState} from 'react';
import "../styles/LogReg.css";
import { useCookies } from "react-cookie";
import {NavLink, useNavigate} from 'react-router-dom';
import CompanyService from "../API/CompanyService";
import UserService from "../API/UserService";

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const [cookies, setCookie] = useCookies(['cookie-name']);
    const router = useNavigate();



    const pushData = async (event) => {
        try {
            event.preventDefault();
            let token = await UserService.loginUser({ email, password });
            if(!token){
                token = await CompanyService.loginCompany({ email, password });
            }
            setCookie("accessToken", token);
            router('/profile');
        } catch (e) {
            console.log(e);
            setErrorMessage("Incorrect login credentials");
        }
    };

    return (
        <div className="LogReg">
            <h2>LOGIN</h2>

            <form onSubmit={pushData}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="submit">Submit</button>
                <NavLink to={"/register"}>Not registered yet?</NavLink>
                <div>
                    <label style={{ color: "red" }}>{errorMessage}</label>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
