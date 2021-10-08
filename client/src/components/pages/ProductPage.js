import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, openFormulario, cerrarMensaje } from '../../actions/ProductAction';
import { Grid } from '@material-ui/core';
import Progress from '../layout/progress/Progress';
import AlertUtils from '../layout/utils/AlertUtils';
import TablaProducto from '../layout/product/TablaProducto';
import DialogoGeneral from '../layout/utils/DialogGeneral';
import FormularioProducto from '../layout/product/FormularioProducto';
import Mensaje from '../layout/utils/Mensaje';
import '../../themes/producto.css'

const ProductPage = () => {
    const dispatch = useDispatch();
    const { loading, error, mensajeError, openModal, guardadoOk, mensaje, productos } = useSelector((state) => state.ProductsReducer);


    useEffect(() => {
        dispatch(getProducts());
    }, []);

    if (loading) return <Progress />
    if (error) return <AlertUtils TYPE={"Error"} CLASS={'errorAlert'} LABEL={mensajeError} />;

    return (
        <Grid container direction="row">
            <Grid>
                <Mensaje open={guardadoOk} mensaje={mensaje} cerrarMsj={() => dispatch(cerrarMensaje())} />
            </Grid>
            <Grid container item xs={12} sm={12} md={12} lg={12} className="containerTabla">
                    <TablaProducto />
            </Grid>
            <Grid item xs={12}>
                <DialogoGeneral open={openModal} cerrar={() => dispatch(openFormulario(false))} contenido={<FormularioProducto />} />
            </Grid>
        </Grid>
    )
}
export default ProductPage;