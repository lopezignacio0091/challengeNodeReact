import React, { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Button } from '@material-ui/core';
import '../../../themes/utils.css'

export default function Mensaje({open, cerrarMsj, mensaje, error}) {

  const cerrar = (
      <Button size="small" className="cerrar" onClick={cerrarMsj}>
        Cerrar
      </Button>
    );

  return (
    <Fragment>
      <Snackbar
        className={(error) ? 'error' : ''}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={cerrarMsj}
        message={mensaje}
        action={
            cerrar
        }
      />
    </Fragment>
  );
}