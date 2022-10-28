import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertInterface {
  open: boolean;
  handleDialog: (isOpen: boolean) => boolean;
  deleteId: number | null;
  deleteUserData: () => void;
}

const AlertDialog: React.FC<AlertInterface> = (props) => {
  const handleClose = () => {
    props?.handleDialog(false);
  };

  const handleCloseWithDelete = () => {
    props?.deleteUserData();
    props?.handleDialog(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure , you want to delete this user ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This process is undone, it means one you delete than you will be not
            able to recover this user.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ fontWeight: "600" }}>
            Cancel
          </Button>
          <Button
            onClick={handleCloseWithDelete}
            autoFocus
            style={{ color: "red", fontWeight: "600" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
