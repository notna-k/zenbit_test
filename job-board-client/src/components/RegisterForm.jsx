import React, { useState } from 'react';
import "../styles/LogReg.css";
import { useCookies } from "react-cookie";
import {NavLink, useNavigate} from 'react-router-dom';
import CompanyService from "../API/CompanyService";
import UserService from "../API/UserService";

const RegisterForm = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [region, setRegion] = useState(null);
    const [city, setCity] = useState(null);

    const [errorMessage, setErrorMessage] = useState('');
    const [isCompany, setIsCompany] = useState(false);


    const [cookies, setCookie] = useCookies(['accessToken']);
    const router = useNavigate();

    const isCompanyClick = () => {
        setIsCompany(!isCompany)
    };



    const pushData = async (event) => {
        try {
            event.preventDefault();
            let token;
            if (isCompany) {
                token = await CompanyService.createCompany({name, email, password, region, city});
            } else {
                token = await UserService.createUser({name, email, password });
            }

            setCookie("accessToken", token);
            //setIsAuth(true);
            router('/profile');
        } catch (e) {
            setErrorMessage(e.toString());
        }
    };

    return (
        <div className="LogReg">
            <h2>REGISTRATION</h2>
            <form onSubmit={pushData}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                {isCompany && (
                    <>
                    <div>
                        <label>Region:</label>
                        <input type="text" value={region} onChange={(event) => setRegion(event.target.value)} />
                    </div>
                    <div>
                        <label>City:</label>
                        <input type="text" value={city} onChange={(event) => setCity(event.target.value)} />
                    </div>
                    </>
                )}
                <div>
                    <label>Are you a company?</label>
                    <input
                        type="checkbox"
                        checked={isCompany}
                        onChange={isCompanyClick}

                    />
                </div>

                <div>
                    <label style={{ color: "red" }}>{errorMessage}</label>
                </div>
                <button type="submit">Submit</button>
                <NavLink to={"/login"}>Already registered?</NavLink>

            </form>
        </div>
    );
};

export default RegisterForm;
