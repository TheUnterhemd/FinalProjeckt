import { useState } from 'react'
import { Modal } from '@mui/material';
import Login from './Login';
import Register from './Register';

const LoginRegModal = ({ open, close }) => {
    const [isReg, setIsReg] = useState(false);

    return (
        <>
            <Modal open={open} onClose={close}>
                {
                    isReg ? <Register setLogin={() => setIsReg(false)} /> : <Login setReg={() => setIsReg(true)} />
                }
            </Modal>
        </>
    )
}

export default LoginRegModal