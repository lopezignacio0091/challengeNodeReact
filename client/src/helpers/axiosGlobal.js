
import axios from 'axios';
import JWT from '../service/JWT';

axios.defaults.headers.common['x-auth-token'] = JWT.getTokken();

export default axios;
