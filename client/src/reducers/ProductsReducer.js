
import { LOADING, ERROR_PRODUCT, ERROR_PRODUCT_OPERATION,CERRAR_MENSAJE_PRODUCTO, CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, SELECT_EDIT, OPEN_FORMULARIO_PRODUCTO, EDIT_PRODUCT } from "../actions/types";
import _ from 'lodash';

const initialState = {
    loading: true,
    productos: [],
    error: false,
    mensajeError: '',
    editProducto: {},
    openModal: false,
    mensaje: '',
    guardadoOk: false,
    errorProducto:false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PRODUCTS:
            return {
                ...state,
                productos: action.payload,
                loading: false,
            };

        case SELECT_EDIT:
            return {
                ...state,
                editProducto: _.filter(state.productos, (x) => { return x._id === action.payload })[0],
                openModal: true,
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                productos: _.filter(state.productos, (x) => { return x._id !== action.payload}),
                openModal: false,
                guardadoOk: true,
                mensaje: 'Se elimino correctamente',
            };
        case EDIT_PRODUCT:
            return {
                ...state,
                productos: _.map(state.productos, (x) => { return x._id === action.payload._id ? action.payload : x }),
                openModal: false,
                guardadoOk: true,
                mensaje: 'Se edito correctamente',
            };

        case OPEN_FORMULARIO_PRODUCTO:
            return {
                ...state,
                editProducto: {},
                openModal: action.payload,
            };
            case ERROR_PRODUCT_OPERATION:
                return {
                    ...state,
                    errorProducto: true,
                    mensajeError: "Error al realizar la operacion",
                };
        case CREATE_PRODUCT:
            return {
                ...state,
                guardadoOk: true,
                productos: [...state.productos, action.payload],
                mensaje: 'Se creo correctamente',
                openModal: false,
            };
        case CERRAR_MENSAJE_PRODUCTO:
            return {
                ...state,
                guardadoOk: false,
                mensaje: '',
                errorProducto: false,
                mensajeError: "",
            };


        case ERROR_PRODUCT:
            return {
                ...state,
                error: true,
                loading: false,
                mensajeError: 'Error por favor comunicarse con el administrador'
            };
        default:
            return state;
    }
};