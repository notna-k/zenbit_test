import axios from "axios";
import {serverUrl} from "../constants/constants";

export default class CompanyService {
    static async getProfile(token) {
        const response = await axios.get(`${process.env.SERVER_URL}/api/companies/profile`, {
            headers:{
                Authorization: "Bearer " + token
            }
        })
        return response;
    }

    static async getCompanyByName(name){
        const response = await axios.get(`${serverUrl}/api/companies?name=`+ name);
        return response.data;
    }

    static async getCompanyByCity(city){
        const response = await axios.get(`${serverUrl}/api/companies?city=`+ city);
        return response.data;
    }

    static async createCompany(data){
        const response = await axios.post(`${serverUrl}/api/auth/registerCompany`, data);
        return response.data;
    }

    static async loginCompany(email, password){
        const response = await axios.post(`${serverUrl}/api/auth/loginCompany`, {
            email: email,
            password: password,
        });
        return response.data;
    }




}