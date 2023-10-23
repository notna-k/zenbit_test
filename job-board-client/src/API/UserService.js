import axios from "axios";
import {serverUrl} from "../constants/constants";
export default class UserService {


    static async getProfile(accessToken) {
        const response = await axios.get(`${serverUrl}/api/users/profile`, {
            headers:{
                Authorization: "Bearer " + accessToken
            }
        })
        return response.data;
    }

    static async createUser(name, email, password){

        const response = await axios.post(`${serverUrl}/api/auth/registerUser`, {
            name: name,
            email: email,
            password: password
        });
        return response.data;
    }

    static async loginUser(email, password){
        const response = await axios.post(`${serverUrl}/api/auth/loginUser`, {
            email: email,
            password: password,
        });
        return response.data;
    }

    static async updateProfile(accessToken, data) {


        try {
            const response = await axios.patch(
                `${serverUrl}/api/users/update`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error occurred during update:', error);
        }
    }

}