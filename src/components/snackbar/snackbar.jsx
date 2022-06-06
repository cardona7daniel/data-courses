import { forwardRef, useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomizedSnackbar(props) {
  const { type = 'success', open = false, children, closed } = props;
  const [isOpened, setOpen] = useState(open);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closed && closed();
    setOpen(false);
  };

  return (
      <Snackbar open={isOpened} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {children}
        </Alert>
      </Snackbar>
  );
}
