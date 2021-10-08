import React from 'react';
import { useState,Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsuario, postCompra, postCompraUser, setLoadingUser,filterGustos } from '../../../actions/FormularioAction';
import { Formik, Form, Field, useFormik } from 'formik';
import { Button, LinearProgress, List, Grid, Card, Avatar, Chip, IconButton } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Logo from '../../../img/positanoLogo.jpg';
import AutoCompleteUtils from '../utils/autoComplete/AutoComplete';
import LeakRemoveIcon from '@material-ui/icons/LeakRemove';
import Alert from '../alert/Alert';
import styles from './style';
import * as Yup from "yup";
import _ from 'lodash';
import MyTextField from './textField/MyTextField';
import CustomProduct from './CustomProduct';
import CustomGusto from './CustomGusto';
import Helado from '../../../img/helado.png';

const FormularioFormik = () => {
    const dispatch = useDispatch();
    const { productos, existe, gustos, loadingUser } = useSelector(state => state.FormularioReducer);
    const FormularioData = useSelector(state => state.FormularioReducer);

    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(0);
    const [agregarGusto, setAgregarGusto] = useState(false);
    const [initialPedido, setInitialPedido] = useState(false);
    const classes = styles();


    const armandoPedido = (values) => {
        (!existe) ? dispatch(postCompra({ ...FormularioData }, values)) : dispatch(postCompraUser(values));
        setPedidoSeleccionado(0);
        setAgregarGusto(false)
    }



    const SignupSchema = Yup.object().shape({
        nombre: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').matches(/^[a-zA-Z ]+$/, "Invalid Name only letters").required('Required'),
        telefono: Yup.number().min(8, 'Not valid Telefone too short').required('Required'),
    });

    return (
        <Formik
            initialValues={{
                nombre: '',
                telefono: '',
                domicilio: '',
                pedido: [],
                cantidad: []
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    armandoPedido(values);
                    setSubmitting(false);
                    resetForm();
                }, 500);
            }}
        >
            {({ submitForm, isSubmitting, values, setFieldValue }) => (
                <Form>
                    <Card className={classes.container}>
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item xs={12} md={12} lg={12} className={classes.header}>
                                <img
                                    alt=""
                                    src={Logo}
                                    width="350"
                                    height="280"
                                    color="white"
                                    className={classes.img}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} className={classes.grid}>
                                <label className={classes.label}>Telefono *</label><br></br>
                                <MyTextField className={classes.textField} name="telefono" type="number" />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} className={classes.grid}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    className={classes.inputs}
                                    disabled={!values.telefono}
                                    onClick={() => { dispatch(setLoadingUser()); dispatch(getUsuario(values, setFieldValue)) }}
                                >
                                    Validar Usuario
                                </Button>
                                <Grid item xs={12} md={12} lg={12} className={classes.grid}>
                                    {
                                        (existe) ? <Alert /> : <Grid />
                                    }

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                {loadingUser && <LinearProgress />}
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} className={classes.grid}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} className={classes.grid}>
                                <label className={classes.label}>Nombre *</label><br></br>
                                <MyTextField className={classes.textField} name="nombre" type="text" disabled={!existe} />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} className={classes.grid}>
                                <label className={classes.label}>Domicilio *</label><br></br>
                                <MyTextField className={classes.textField} name="domicilio" type="text" disabled={!existe} />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} className={classes.grid}>
                                <Grid container direction="row" className={classes.inputs}>
                                    {_.isEmpty(!productos) &&
                                        _.map(productos, i =>
                                            <CustomProduct key={i.id} name={i.nombre} accion={() => {
                                                _.set(i, 'idInterno', Math.floor(Math.random() * 900));
                                                setFieldValue('cantidad', [...values.cantidad, i]);
                                                setFieldValue('pedido', [...values.pedido, []])
                                            }} />
                                        )}
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} className={classes.grid}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={6} lg={6} className={classes.grid}>
                                        {_.map(values.cantidad,
                                            (data, index) => {
                                                return (
                                                    <Chip
                                                        icon={LeakRemoveIcon}
                                                        label={data.nombre}
                                                        onDelete={() => {
                                                            const cantidad = _.filter(values.cantidad, e => { return (e.idInterno != data.idInterno) })
                                                            setFieldValue(`cantidad`, cantidad);
                                                        }}
                                                        variant="outlined"
                                                        className={classes.chips}
                                                        onClick={() => { setAgregarGusto(true); setPedidoSeleccionado(index); setInitialPedido(true); }}
                                                        color={(pedidoSeleccionado === index) ? "secondary" : "primary"}
                                                    />
                                                )
                                            })}
                                    </Grid>
                                    {(initialPedido) &&
                                        <Grid item xs={6} md={6} lg={6} className={classes.grid}>
                                            {_.map(values.pedido[pedidoSeleccionado], (data, index) =>
                                                <Chip
                                                    icon={LeakRemoveIcon}
                                                    label={data.nombre}
                                                    onDelete={() => {
                                                        const pedido = _.filter(values.pedido[pedidoSeleccionado], e => e.idInterno !== data.idInterno)
                                                        setFieldValue(`pedido.${pedidoSeleccionado}`, pedido);
                                                    }}
                                                    className={classes.chips}
                                                    avatar={<Avatar src={Helado} />}
                                                    variant="outlined"
                                                />
                                            )}
                                        </Grid>}
                                </Grid>
                            </Grid>
                            {(agregarGusto) &&
                                <Fragment>
                                    <Grid item xs={12}>
                                        <AutoCompleteUtils OPTIONS_SELECT={gustos}
                                            ONCHANGE_SELECT={(_, value) => { (value != null) ? dispatch(filterGustos(value["id"])) : dispatch(filterGustos(0)) }}
                                            LABEL_SELECT={"Select Gustos"} 
                                            LABEL="nombre" />
                                    </Grid>
                                    <Grid container item xs={12} md={12} lg={12} spacing={2} className={classes.gridGustos}>
                                        {_.isEmpty(!gustos) &&
                                            _.map(gustos, i =>
                                                <Grid item xs={4}>
                                                    <List>
                                                        <CustomGusto name={i.nombre} seleccionado={i.seleccionado} accion={() => {
                                                            let Pedido = values.pedido[pedidoSeleccionado];
                                                            _.set(i, 'idInterno', Math.floor(Math.random() * 900));
                                                            Pedido.push(i)
                                                            setFieldValue(`pedido.${pedidoSeleccionado}`, Pedido)
                                                        }} />
                                                    </List>
                                                </Grid>
                                            )}
                                    </Grid></Fragment>}
                            <Grid item xs={12} md={12} lg={12}>
                                {isSubmitting && <LinearProgress />}
                            </Grid>
                            <Grid item xs={12} md={4} lg={4} className={classes.gridBotton}>
                                <Button
                                    variant="contained"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                    className={classes.Botton}
                                >
                                    Enviar
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4} className={classes.gridBotton}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    disabled={isSubmitting}
                                    onClick={() => { alert('cancelado') }}
                                    className={classes.inputs}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Form>

            )}
        </Formik>
    );
}

export default FormularioFormik;
