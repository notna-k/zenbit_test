import axios from "axios";
import {serverUrl} from "../constants/constants";

export default class PostService {
    static async getAll() {
        const response = await axios.get(`${serverUrl}/api/vacancies/`)
        return response.data;
    }

    static async getById(id) {
        const response = await axios.get(`${serverUrl}/api/vacancies?id=` + id)
        return response.data;
    }

    static async getPostsByCompany(company) {
        const response = await axios.get(`${serverUrl}/api/vacancies?company=` + company)
        return response.data;
    }
}