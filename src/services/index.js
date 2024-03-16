import axios from "axios";

const api = axios.create({
    baseURL: 'https://estoque-fastapi.onrender.com'
})
export default api;