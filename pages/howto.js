import {
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Menu, MenuItem,
    Avatar, Tooltip,
    IconButton, ListItemIcon,
    Link,
    Button
} from "@mui/material";
import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Logout from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function Howto(){
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
        <AppBar position="static" sx={{minHeight: '5vh',maxHeight:'15vh', backgroundColor: "white"}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
              BLOcksurvVEY
            </Typography>
            <Button href="/howto" variant="outlined">First time?</Button>
            {session ? (
            <Tooltip title="Account settings">
              <IconButton onClick={handleClick}>
                <Avatar alt={session.user.email} src={session.user.image} />
              </IconButton>
            </Tooltip>
          ) : (
            <Button onClick={() => signIn('google')} variant="outlined">Login/Signup</Button>
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
    </div>
    <Typography variant="h3" sx={{marginTop: "20px"}}>First install Metamask browser extension for your wallet</Typography>
    <Link href="https://metamask.io/download">https://metamask.io/download</Link>
    <Typography variant="h3" sx={{marginTop: "40px"}}>Then sign in with Google to our website to access forms and dashboard :)</Typography>
    <Link href="http://smartforms.tech">Back to home</Link><br></br><br></br><br></br>
    <Link href="mailto:hax0037@gmail.com?subject=Feedback&body=Message">Contact Us</Link>
  </>
)
}
