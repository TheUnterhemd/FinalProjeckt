import { useState } from "react";
import { Alert, Modal, Portal, Snackbar } from "@mui/material";
import Login from "./Login";
import Register from "./Register";

const LoginRegModal = ({ open, close }) => {
  const [isReg, setIsReg] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [warningToast, setWarningToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something has gone very wrong. Contact support please."
  );
  function handleClose() {
    setOpenToast(false);
    setErrorToast(false);
    setWarningToast(false);
  }
  return (
    <>
      <Portal>
        {/* Feedback for successful registration (Register)*/}

        <Snackbar
          open={openToast}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            You successfully registered. Check your mail to verify your account.
          </Alert>
        </Snackbar>
        {/* Error Message (Register) */}
        <Snackbar
          open={errorToast}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
        {/* Warning Message (Login) */}
        <Snackbar
          open={warningToast}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
            Please verify your E-Mail!
          </Alert>
        </Snackbar>
      </Portal>
      <Modal open={open} onClose={close}>
        <>
          {isReg ? (
            <Register
              setLogin={() => setIsReg(!isReg)}
              close={close}
              setErrorMessage={setErrorMessage}
              setOpenToast={setOpenToast}
              setErrorToast={setErrorToast}
            />
          ) : (
            <Login setReg={() => setIsReg(true)} close={close} setWarningToast={setWarningToast} />
          )}
        </>
      </Modal>
    </>
  );
};

export default LoginRegModal;
