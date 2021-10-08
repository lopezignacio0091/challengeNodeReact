import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const SelectUtils = (props) => {

    return (
        <>

            <TextField
                id="outlined-select-currency"
                select
                className='selectUtils'
                defaultValue={props.SET_VALUE}
                onChange={props.ONCHANGE_SELEC}
                variant="outlined"
            >
                {props.OPTIONS_SELECT.map((option) => (
                    <MenuItem key={option[props.LABEL]} value={option[props.LABEL]}>
                        {option[props.LABEL]}
                    </MenuItem>

                ))}
            </TextField>

        </>
    );
};
export default SelectUtils;