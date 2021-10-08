import  React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';


const CustomEdit = ({accion}) => {
    return (
        <React.Fragment>
            <Tooltip title={"Delete"}>
                <IconButton onClick={accion}>
                        <DeleteIcon style={{ 'color':'grey'}} />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );

}

export default CustomEdit;