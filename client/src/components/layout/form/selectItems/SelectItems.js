import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Field } from 'formik';
import {  Select  } from 'formik-material-ui';
import styles from '../style'

const SelectItems = ({ listItems,title, atribute }) => {
    classes = styles();
    return (
        <FormControl >
            <InputLabel htmlFor="nacionalidad">{title}</InputLabel>
            <Field
                component={Select}
                name={title}
                inputProps={{
                    id: {title},
                }}
                className={classes.inputs}   
            >
                {listItems.length > 0 && listItems.map((item, index) => (
                    <MenuItem value={item[atribute]} key={index}>{item[atribute]}</MenuItem>
                ))
                }
            </Field>
        </FormControl>
    );
}

export default SelectItems;
