import http from "../helpers/axiosInstance";

const seccion = 'User';

const getAll = () => {
  return http.get(`/${seccion}`);
};

const getByPhone = phone => {
  return http.get(`/${seccion}/getByPhone?Phone=${phone}`);
};

const create = data => {
  return http.post(`/${seccion}`, data);
};

const update = (data) => {
  return http.post(`/${seccion}/edit`,data);
};


const remove = (data) => {
  return http.post(`/${seccion}/deleteById`, data);
};

const UsuarioService = {
  getAll,
  getByPhone,
  create,
  update,
  remove,
};

export default UsuarioService;