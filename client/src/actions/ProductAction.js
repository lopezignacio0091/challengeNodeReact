import {
    GET_PRODUCTS,
    ERROR_PRODUCT,
    SELECT_EDIT,
    OPEN_FORMULARIO_PRODUCTO,
    CERRAR_MENSAJE_PRODUCTO,
    EDIT_PRODUCT,
    CREATE_PRODUCT,
    ERROR_PRODUCT_OPERATION,
    DELETE_PRODUCT
} from './types';
import ProductoService from '../service/producto.service';

export const getProducts= () => async dispatch => {
    try {
        const data = await  ProductoService.getAll();
            dispatch({
                type: GET_PRODUCTS,
                payload: data.data
            });
        }
     catch (error) {
         console.log(error);
        dispatch({
            type: ERROR_PRODUCT,
            payload: 'Error buscando la info de los productos \n ' + error
        });
    };
}

export const editSelectProducto =(valueId)=>dispatch=>{

    dispatch({
        type: SELECT_EDIT,
        payload: valueId
    });
}

export const openFormulario =(values)=>dispatch=>{

    dispatch({
        type: OPEN_FORMULARIO_PRODUCTO,
        payload: values
    });
}

export const editarProducto =(id,values)=> async dispatch=>{

    try {
        const data = await  ProductoService.editProduct(id,values);
            dispatch({
                type: EDIT_PRODUCT,
                payload: data.data
            });
        }
     catch (error) {
        dispatch({
            type: ERROR_PRODUCT,
            payload: 'Error buscando la info de los productos \n ' + error
        });
    };
}

export const cerrarMensaje =()=>dispatch=>{

    dispatch({
        type: CERRAR_MENSAJE_PRODUCTO,
        
    });
}

export const createProducto =(values)=> async dispatch=>{

    try {
        const data = await  ProductoService.createProduct(values);
            dispatch({
                type: CREATE_PRODUCT,
                payload: data.data
            });
        }
     catch (error) {
        dispatch({
            type: ERROR_PRODUCT_OPERATION,
        });
    };
}

export const deleteProducto =(values)=> async dispatch=>{

    try {
        const data = await  ProductoService.deleteProduct(values);
            dispatch({
                type: DELETE_PRODUCT,
                payload: values
            });
        }
     catch (error) {
        dispatch({
            type: ERROR_PRODUCT_OPERATION,
        });
    };
}