import CompanyProfile from "../components/CompanyProfile";
import {UserProfile} from "../components/UserProfile";
import { useCookies } from "react-cookie";
import UserService from "../API/UserService";
import CompanyService from "../API/CompanyService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"

const Profile = () => {
    const [cookies, setCookie] = useCookies(['accessToken']);
    const [user, setUser] = useState({});
    const [company, setCompany] = useState({});

    const accessToken = cookies['accessToken'];
    const router = useNavigate();
    const [payload, setPayload] = useState(jwt_decode(accessToken));


    useEffect(() => {
        const fetchData = async () => {
            try {
                setPayload(jwt_decode(accessToken));
                if (payload['type'] === "USER") {
                    const userData = await UserService.getProfile(accessToken); // Your own function to fetch user data
                    setUser(userData);

                } else if (payload['type'] === "COMPANY") {
                    const companyData = await CompanyService.getProfile(accessToken); // Your own function to fetch company data
                    setCompany(companyData);
                } else {
                    router("/login");
                }
            } catch (error) {
                router("/login");
            }
        };
        fetchData();
    }, [accessToken]);

    if (payload['type'] === "USER") {
        return <UserProfile user={user} accessToken={accessToken} />;
    } else if (payload['type'] === "COMPANY") {
        return <CompanyProfile company={company} />;
    } else {
        router("/login");
    }

};

export default Profile;
