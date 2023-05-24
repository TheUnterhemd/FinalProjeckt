import { useState } from "react";
import { Modal } from "@mui/material";
import Login from "./Login";
import Register from "./Register";

const LoginRegModal = ({ open, close }) => {
  const [isReg, setIsReg] = useState(false);

  return (
    <>
      <Modal open={open} onClose={close}>
        {isReg ? (
          <Register setLogin={() => setIsReg(false)} close={close} />
        ) : (
          <Login setReg={() => setIsReg(true)} close={close} />
        )}
      </Modal>
    </>
  );
};

export default LoginRegModal;
