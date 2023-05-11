import { useState } from 'react'
import { Modal } from '@mui/material';
import Login from './Login';

const LoginRegModal = ({ open, close }) => {
    const [isReg, setIsReg] = useState(false);



    return (
        <>
            <Modal open={open} onClose={close}>
                <Login />
            </Modal>
        </>
    )
}

export default LoginRegModal