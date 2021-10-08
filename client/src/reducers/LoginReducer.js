
import { LOADING, SET_ERROR,GET_USER_LOGIN ,LOGOUT,SET_ERROR_LOGIN,SET_SELECTED_INDEX,SET_LOADING} from "../actions/types";
const initialState = {
    loading: false,
    usuario: {},
    autorizado: false,
    errorLogin: false,
    mensajeErrorLogin: "",
    selectedIndex:0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_USER_LOGIN:
            return {
                ...state,
                usuario: action.payload,
                autorizado: true,
                loading: false,
                errorLogin: false,
            };
        case LOGOUT:
            return {
                ...state,
                autorizado: false,
                usuario:{},
                mensajeErrorLogin:''
            };
        case SET_ERROR_LOGIN:
            return {
                ...state,
                errorLogin: true,
                mensajeErrorLogin: ' Usuario o contrasena Invalidos',
                loading:false
            };
            case SET_SELECTED_INDEX:
                return {
                    ...state,
                    selectedIndex:action.payload,
                };
        default:
            return state;
    }
};