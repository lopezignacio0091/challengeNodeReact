import React from 'react'
import { Grid, IconButton, Avatar } from "@material-ui/core";
import Pedido from '../../../img/pedido.png';
const CustomProduct = ({ name, accion }) => {
    return (
        <Grid item xs={4}>
            <IconButton aria-label="delete" size="medium" onClick={accion}>
                <Avatar alt="Remy Sharp" src={Pedido} />{name}
            </IconButton>
        </Grid>
    )
}
export default CustomProduct;