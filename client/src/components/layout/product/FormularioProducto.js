import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openFormulario,editarProducto,createProducto } from '../../../actions/ProductAction';
import { Formik, Form } from 'formik';
import { Button, LinearProgress, Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import * as Yup from "yup";
import _ from 'lodash';
import MyTextField from './MyTextField';
import '../../../themes/formulario.css';

const FormularioFormik = () => {
    const dispatch = useDispatch();
    const { editProducto } = useSelector((state) => state.ProductsReducer);

    const SignupSchema = Yup.object().shape({
        stock: Yup.number().required('Required'),
        nombre: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').matches(/^[a-zA-Z ]+$/, "Invalid Name only letters").required('Required'),
        precio:Yup.number().required('Required'),
    });

  
    const editar = (values) => {
        !_.isEmpty(editProducto) ?
        dispatch(editarProducto(values.id,{ 'stock': values.stock, 'name': values.nombre,'price':values.precio})) :
        dispatch(createProducto({ 'stock': values.stock, 'name': values.nombre,'price':values.precio})) ;
        
    }

    return (
        <Formik
            initialValues={{
                nombre: !_.isEmpty(editProducto) ? editProducto.name : '',
                precio: !_.isEmpty(editProducto) ? editProducto.price :  '',
                stock: !_.isEmpty(editProducto) ? editProducto.stock : '',
                id:!_.isEmpty(editProducto) ? editProducto._id : '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    editar(values);
                    setSubmitting(false);
                    resetForm();
                }, 500);
            }}
        >
            {({ submitForm, isSubmitting, values, setFieldValue }) => (
                <Form>

                    <Grid container direction="row" justify="center" style={{ 'padding': '5%' }} alignItems="center" spacing={2}>
                            <Grid item xs={12} md={12} lg={12} >
                                <Typography className="tituloForm">Formulario Producto!</Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} className="gridItem">
                                <label className='label'>Nombre *</label><br></br>
                                <MyTextField name="nombre" type="text"  style={{'width':'90%'}}/>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} className="gridItem">
                                <label className='label'>Stock *</label><br></br>
                                <MyTextField name="stock" type="number" style={{'width':'90%'}} />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} className="gridItem">
                                <label className='label'>Price *</label><br></br>
                                <MyTextField name="precio" type="number" style={{'width':'90%'}} />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} className="gridItem">
                                <Divider />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                {isSubmitting && <LinearProgress />}
                            </Grid>
                            <Grid container spacing={3} className="gridItem">

                                <Grid item xs={12} md={6} lg={6} >
                                    <Button
                                        variant="contained"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                        className='btnAceptar'

                                    >
                                        Enviar
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        disabled={isSubmitting}
                                        onClick={() => dispatch(openFormulario(false))}
                                        className="btnCancelar"
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>

                            </Grid>
                    </Grid>

                </Form>

            )}
        </Formik >
    );
}

export default FormularioFormik;
