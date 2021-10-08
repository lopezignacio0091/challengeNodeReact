import axios from 'axios';
import {devUrl} from '../actions/types';
import JWT from '../service/JWT';

const axiosInstance = axios.create({
  baseURL: `${devUrl}/api`,
});

axiosInstance.interceptors.request.use(function (config) {

  const token = JWT.getTokken();

  if(token){
    config.headers.Authorization =  'Bearer '+ JWT.getTokken();
  }
  else{
    config.headers.Authorization =  null;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default axiosInstance;