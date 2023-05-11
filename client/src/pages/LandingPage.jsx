import { useState } from 'react'
import { Button } from '@mui/material';
import LoginRegModal from '../components/LoginRegister/LoginRegModal'

export default function LandingPage() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Login/Register</Button>
      <LoginRegModal open={open} close={handleClose} />
    </div>
  )
}
