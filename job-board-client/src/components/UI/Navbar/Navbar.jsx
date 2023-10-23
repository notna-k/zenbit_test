import React, {useContext, useState} from 'react';
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import "./NavBar.css"
import {useCookies} from "react-cookie";
import jwt_decode from "jwt-decode";

const Navbar = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const router = useNavigate();


    const logout = async (event) => {
        event.preventDefault();
        removeCookie("accessToken");
        router("/login");
    }
    const toVacancies = async (event) => {
        event.preventDefault();
        router("/posts");
    }
    const toProfile = async (event) => {
        event.preventDefault();

        router("/profile");
    }

    const toAbout = async (event) => {
        event.preventDefault();
        router("/about");
    }


    return (
        <div className="NavBar">
            <button style={{background: "blueviolet"}} onClick={logout}>
                Logout
            </button>
            <button style={{background: "firebrick"}} onClick={toVacancies}>
                Vacancies
            </button>
            <button style={{background: "darkgreen"}} onClick={toProfile}>
                Profile
            </button>
            <button style={{background: "seagreen"}} onClick={toAbout}>
                About
            </button>
            <Outlet/>

        </div>
    );
};

export default Navbar;
