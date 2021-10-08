import {
    SET_ERROR,
    SET_LOADING,
    GET_USER_LOGIN,
    LOGOUT,
} from './types';
import JWT from '../service/JWT'
import LoginService from '../service/login.service';

export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}

export const getLoginUser = (values) => async dispatch => {
    try {
        dispatch(setLoading());
        const { data } = await LoginService.login(values);
        localStorage.setItem("USER_COMERCE", JSON.stringify(data));
        JWT.Init(data.token);
        dispatch({
            type: GET_USER_LOGIN,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: SET_ERROR,
            payload: error
        });

    }
}

export const logout = () => dispatch => {
    localStorage.removeItem("USER_COMERCE");
    dispatch({
        type: LOGOUT,
    });

}


export const userIsLogIn = (data) => dispatch => {
    localStorage.setItem("USER_COMERCE", JSON.stringify(data));
    JWT.Init(data.token);
    dispatch({
        type: GET_USER_LOGIN,
        payload: data
    });
}
