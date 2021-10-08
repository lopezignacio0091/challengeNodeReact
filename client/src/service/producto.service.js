import axios from "axios";
import {devUrl} from '../actions/types';
import JWT from "./JWT";
const seccion = 'products';



const getAll = () => {
  axios.defaults.headers.common['x-auth-token'] = JWT.getTokken();
  return axios.get(`${devUrl}/api/${seccion}`);
};

const getById = id => {
  return axios.get(`/${seccion}/getById?Id=${id}`);
};


const editProduct =(id,values)=>{
  axios.defaults.headers.common['x-auth-token'] = JWT.getTokken();
  return axios.put(`${devUrl}/api/${seccion}/${id}`,values);
}


const createProduct =(values)=>{
  axios.defaults.headers.common['x-auth-token'] = JWT.getTokken();
  return axios.post(`${devUrl}/api/${seccion}`,values);
}

const deleteProduct =(id)=>{
  axios.defaults.headers.common['x-auth-token'] = JWT.getTokken();
  return axios.delete(`${devUrl}/api/${seccion}/${id}`);
}

const ProductoService = {
  getAll,
  getById,
  editProduct,
  createProduct,
  deleteProduct
};

export default ProductoService;