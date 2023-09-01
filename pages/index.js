import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  Avatar,
  Button,
  Paper,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Link
} from "@mui/material";
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Dashboard(){

  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
return(
  <>
    <div>
    <CssBaseline/>
    <style>
        {`
          body {
            background-color: #696969;
            height: 100vh;
          }
        `}
      </style>
    <AppBar position="static" sx={{ minHeight: '5vh', maxHeight: '15vh', marginBottom: '10px', backgroundColor: "white" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
          BLOcksurvVEY
        </Typography>
        <Button onClick={() => setGraphOpen(true)}>estimate</Button>
        {session ? (
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick}>
            <Avatar alt={session.user.email} src={session.user.image} />
          </IconButton>
        </Tooltip>
      ) : (
        <Button onClick={() => signIn('google')}>Login/Signup</Button>
      )}

       <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx= {{
            overflow: 'visible',
            mt: 1.5,
          }}
      >
  <Link href="/dashboard" passHref>
    <MenuItem onClick={handleClose}>
      <ListItemIcon>
        <AccountCircleIcon fontSize="medium" />
      </ListItemIcon>
      Dashboard
    </MenuItem>
  </Link>
        <MenuItem onClick={()=>signOut()}>
          <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
  
      </Toolbar>
    </AppBar>
    pls finish the website pepepray :prayge:
    </div>
  </>
)
}