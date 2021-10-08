import React from 'react'
import { Grid, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import Helado from '../../../img/heladoColor.png';
import '../../../themes/formulario.css';

const CustomGusto = ({ name, accion, seleccionado }) => {
    return (
        <>
            <ListItem onClick={accion} className='labelGustos'>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={Helado} style={{'width': '50%','height': '50%'}} />
                </ListItemAvatar>
                <ListItemText primary={name} />
            </ListItem>
        </>
    )
}
export default CustomGusto;