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
    IconButton
} from "@mui/material";
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { redirect } from 'next/navigation';

export default function Dashboard(){
  const { data: session } = useSession();
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (session?.user?.email) {
        const resp = await fetch(
          "http://localhost:3000/api/findUser",
          {
            method: "POST",
            body: JSON.stringify({ mail: session.user.email }),
          }
        );
        const dat = await resp.json();
        setFetchedData(dat.data);
      }
    }
    if (session) {
      fetchData();
    }
  }, [session]);

  const profileData = {
    name: session?.user?.name || 'Waiting...',
    email: session?.user?.email || 'for sign in...',
    profilePhoto: session?.user?.image || '',
  };

  const dataPoints = fetchedData
    ? [
        { label: 'Surveys Taken', value: fetchedData.survtaken },
        { label: 'Amount Earned', value: Number(fetchedData.amtearned) },
        { label: 'Surveys Created', value: fetchedData.survmade },
      ]
    : [];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExport = async (formUUID) => {
    window.location.href=`http://localhost:3000/api/exportResp?formUUID=${formUUID}`;
  };
return(
  <>
    <div>
    <CssBaseline/>
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="medium" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
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
    <div>
    <Typography variant="h4" sx={{marginTop: '20px', marginLeft:'20px'}} gutterBottom>Your Dashboard</Typography>
    <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', width: 'fit-content', marginRight: '20px' }}>
        <Avatar alt="Profile Photo" src={profileData.profilePhoto} sx={{ width: 100, height: 100, marginBottom: '10px' }} />
        <Typography variant="h5" gutterBottom>
          {profileData.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {profileData.email}
        </Typography>
      </Paper>

      {dataPoints.map((dataPoint, index) => (
        <Paper key={index} elevation={3} style={{ padding: '20px', marginBottom: '20px', width: 'fit-content', marginRight: '20px' }}>
          <Typography variant="h6" gutterBottom>
            {dataPoint.value}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {dataPoint.label}
          </Typography>
        </Paper>
      ))}
    </div>
    <div>
    <Typography variant="h5" gutterBottom>
      Your Created Forms:
    </Typography>
    {fetchedData ? (
      <ul>
        {fetchedData.created.map((formUUID) => (
          <>
          <li key={formUUID}>{formUUID}</li>
          <Button variant="outlined" onClick={() => handleExport(formUUID)}>Export</Button>
          <Button variant="outlined" onClick={()=>{window.location.href=`http://localhost:3000/response?id=${formUUID}`}}>Responses</Button>
          </>
        ))}
      </ul>
    ) : (
      <p>Loading your forms...</p>
    )}
  </div>
    </div>
  </>
)
}