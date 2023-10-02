import React, { useEffect, useState } from 'react';
import{
    Card,
    CardContent,
    Typography,
    Button,
    AppBar,
    Menu, MenuItem,
    Toolbar,
    Avatar, Tooltip,
    IconButton, ListItemIcon,
    Link,
    CssBaseline
} from '@mui/material'
import { signIn, signOut, useSession } from 'next-auth/react'
import Logout from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function Allforms(){
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: session } = useSession();
  const [forms, setForms] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetch('/api/getAllforms')
      .then((response) => response.json())
      .then((data) => setForms(data));
  }, []);
  console.log(forms)
  return (
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

      <Typography variant="h3" sx={{marginTop: '15px'}}>Latest Forms:</Typography>
      <div>
        {[...forms].reverse().map((form) => (
          <Card key={form.id} variant="outlined" sx={{marginBottom: '5px'}}>
            <CardContent>
              <Typography variant="h6">{form.title}</Typography>
              <Typography variant="body2">{form.description}</Typography>
              <Button
              variant="outlined"
              onClick={() => {
                function go() {
                  window.location.href = `/formView?id=${form.id}`;
                }
                go();
              }}
            >
              Payout: {form.a}
            </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
