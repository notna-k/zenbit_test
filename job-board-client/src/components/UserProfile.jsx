/*


import React, {useEffect, useState} from 'react';
import "../styles/Profile.css"
import UserService from "../API/UserService";

export const UserProfile = ({user, accessToken}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateUser, setUpdateUser] = useState(user);


    const [name, setName] = useState(user.name);
    const [city, setCity] = useState(user.city);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [description, setDescription] = useState(user.description);
    const [region, setRegion] = useState(user.region);
    const [resume, setResume] = useState(user.resume);

    const handleSave = async (event) => {
        event.preventDefault();

        const args = {};

        if (name !== user.name) args.name = name;
        if (city !== user.city) args.city = city;
        if (phoneNumber !== user.phoneNumber) args.phoneNumber = phoneNumber;
        if (description !== user.description) args.description = description;
        if (region !== user.region) args.region = region;
        if (resume !== user.resume) args.resume = resume;

        user = await UserService.updateProfile(accessToken, args);
        setUpdateUser(user);

        setIsEditing(false);

    };

    useEffect(() => {
        setName(user.name);
        setCity(user.city);
        setPhoneNumber(user.phoneNumber);
        setDescription(user.description);
        setRegion(user.region);
        setResume(user.resume);
    }, [user]);

    const handleEdit = (event) => {
        event.preventDefault();
        setIsEditing(true);
    };



    return (
        <div className="Profile">
            <h2>User Details</h2>
            <form>
                <label>Name:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <input type={"text"} readOnly>{name}</input>
                )}
                {!isEditing && (
                    <>
                        <label>Email:</label>
                        <input type={"text"} readOnly>{user.email}</input>
                    </>
                )}
                <label>Phone Number:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                ) : (
                    <input type={"text"} readOnly>{phoneNumber}</input>
                )}
                <label>Region:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                ) : (

                    <input type={"text"} readOnly>{region ?? "Not defined"}</input>
                )}
                <label>City:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                ) : (
                    <input type={"text"} readOnly>{city ?? "Not defined"}</input>
                )}
                <label>Description:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                ) : (
                    <input type={"text"} readOnly>{description ?? "Not defined"}</input>
                )}
                <label>Resume link:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={resume}
                        onChange={(e) => setResume(e.target.value)}
                    />
                ) : (
                    <input type={"text"} readOnly>{resume ?? "Not defined"}</input>
                )}
                {isEditing ? (
                    <button onClick={handleSave}>Save</button>
                ) : (
                    <button onClick={handleEdit}>Edit</button>
                )}
            </form>
        </div>
    );
};
*/

import React, { useEffect, useState } from 'react';
import "../styles/Profile.css";
import UserService from "../API/UserService";

export const UserProfile = ({ user, accessToken }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateUser, setUpdateUser] = useState(user);

    const [name, setName] = useState(user.name);
    const [city, setCity] = useState(user.city);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [description, setDescription] = useState(user.description);
    const [region, setRegion] = useState(user.region);
    const [resume, setResume] = useState(user.resume);

    const handleSave = async (event) => {
        event.preventDefault();

        const args = {
            name,
            city,
            phoneNumber,
            description,
            region,
            resume
        };

        const updatedUser = await UserService.updateProfile(accessToken, args);
        setUpdateUser(updatedUser);
        setIsEditing(false);
    };

    const handleBack = (event) => {
        event.preventDefault();
        setIsEditing(false);
    }

    useEffect(() => {
        setName(user.name);
        setCity(user.city);
        setPhoneNumber(user.phoneNumber);
        setDescription(user.description);
        setRegion(user.region);
        setResume(user.resume);
    }, [user]);

    const handleEdit = (event) => {
        event.preventDefault();
        setIsEditing(true);
    };

    return (
        <div className="Profile">
            <h2>User Details</h2>
            <form>
                <label>Name:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <span>{name}</span>
                )}
                <label>Email:</label>
                <span>{user.email}</span>
                <label>Phone Number:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                ) : (
                    <span>{phoneNumber}</span>
                )}
                <label>Region:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                ) : (
                    <span>{region}</span>
                )}
                <label>City:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                ) : (
                    <span>{city}</span>
                )}
                <label>Description:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                ) : (
                    <span>{description}</span>
                )}
                <label>Resume link:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={resume}
                        onChange={(e) => setResume(e.target.value)}
                    />
                ) : (
                    <span>{resume}</span>
                )}
                {isEditing ? (
                    <>
                    <button onClick={handleSave}>Save</button>
                        <div style={{marginTop: 10, marginBottom: 10}}></div>

                        <button style={{background: "darkslateblue"}} onClick={handleBack}>Back</button>
                    </>
                ) : (
                    <button onClick={handleEdit}>Edit</button>
                )}
            </form>
        </div>
    );
};

export default UserProfile;
