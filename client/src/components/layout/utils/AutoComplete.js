import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const SelectUtils = (props) => {
    
    return (
        <>
            <Autocomplete
                // className={classes.selectUtils}
                style={{'marginTop':'10px'}}
                options={props.OPTIONS_SELECT}
                onChange={props.ONCHANGE_SELECT}
                defaultValue={props.SET_VALUE}
                getOptionLabel={(option) => option[props.LABEL]}
                renderInput={(params) =>
                    <TextField {...params}
                        label={props.LABEL_SELECT}
                        variant="outlined"
                        value={props.SET_VALUE}
                        size="small" 
                        />}
            />
        </>
    );
};
export default SelectUtils;