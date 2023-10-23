import React, { useEffect, useState } from 'react';
import CompanyService from "../API/CompanyService";

export const CompanyProfile = ({ company, accessToken }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateCompany, setUpdateCompany] = useState(company);

    const [name, setName] = useState(company.name);
    const [phoneNumber, setPhoneNumber] = useState(company.phoneNumber);
    const [description, setDescription] = useState(company.description);
    const [region, setRegion] = useState(company.region);
    const [city, setCity] = useState(company.city);

    const handleSave = async (event) => {
        event.preventDefault();

        const args = {
            name,
            phoneNumber,
            description,
            region,
            city
        };

        const updatedCompany = await CompanyService.updateProfile(accessToken, args);
        setUpdateCompany(updatedCompany);
        setIsEditing(false);
    };

    const handleBack = (event) => {
        event.preventDefault();
        setIsEditing(false);
    }

    useEffect(() => {
        setName(company.name);
        setPhoneNumber(company.phoneNumber);
        setDescription(company.description);
        setRegion(company.region);
        setCity(company.city);
    }, [company]);

    const handleEdit = (event) => {
        event.preventDefault();
        setIsEditing(true);
    };

    return (
        <div className="Profile">
            <h2>Company Details</h2>
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
                <span>{company.email}</span>
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

export default CompanyProfile;
