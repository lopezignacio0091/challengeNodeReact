import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent } from "@material-ui/core";

export default function DialogoGeneral({ open, cerrar, contenido }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={cerrar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>{contenido}</DialogContent>
      </Dialog>
    </div>
  );
}
