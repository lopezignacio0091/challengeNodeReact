import  React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from '@material-ui/icons/Edit';


const CustomEdit = ({accion}) => {
    return (
        <React.Fragment>
            <Tooltip title={"Edit"}>
                <IconButton onClick={accion}>
                        <EditIcon style={{ 'color':'grey'}} />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );

}

export default CustomEdit;