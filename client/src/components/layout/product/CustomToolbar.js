import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {openFormulario} from '../../../actions/ProductAction';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';

const defaultToolbarStyles = {
    iconButton: {
        color: "#757575"
    },
};

const CustomDownload = () => {
    const dispatch = useDispatch();
   
    return (
        <React.Fragment>
            <Tooltip title={"Add"}>
                <IconButton onClick={()=>{dispatch(openFormulario(true))}}>
                    <AddIcon style={{'color':'grey'}} />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );

}

export default withStyles(defaultToolbarStyles, { name: "CustomDownload" })(CustomDownload);