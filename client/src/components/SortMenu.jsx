import { useState, useContext } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { SortContext } from '../context/SortContext';

const SortMenu = () => {
    const { setSort } = useContext(SortContext);
    //setting up menu close & open
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <Button
                variant='outlined'
                aria-controls={open ? 'menu-open' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpen}
            >
                Sort
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => setSort('ascPrice')}>ASC by Price</MenuItem>
                <MenuItem onClick={() => setSort('descPrice')}>DESC by Price</MenuItem>
                <MenuItem onClick={() => setSort('ascDate')}>ASC by Date</MenuItem>
                <MenuItem onClick={() => setSort('descDate')}>DESC by Date</MenuItem>
            </Menu>
        </>
    )
}

export default SortMenu