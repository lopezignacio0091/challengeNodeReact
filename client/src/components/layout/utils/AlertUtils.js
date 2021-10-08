import React from 'react'
import Alert from '@material-ui/lab/Alert';
import '../../../themes/utils.css'
export default function AlertUtils(props) {
    return (
        <>
             <Alert severity={props.TYPE} className={props.CLASS}>{props.LABEL}</Alert>
        </>
    )
}
