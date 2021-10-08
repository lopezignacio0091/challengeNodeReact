import http from "../helpers/axiosInstance";
import axios from 'axios';
import {devUrl} from '../actions/types';

const seccion = 'auth';
const login = data => {
   
    return axios.post(`/api/${seccion}`,data)
}

const LoginService = {
    login,
};

export default LoginService;