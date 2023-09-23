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
  Link,
  TextField,
} from "@mui/material"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Logout from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

let inResult=[];
export default function Dashboard(){

      const { data: session } = useSession();
      const [anchorEl, setAnchorEl] = useState(null);
      const [search, setSearch]=useState();
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      
      async function handleSearch(val){
        if(val==''){
          setSearch(val);
          document.getElementById('searchDiv').style.visibility='hidden';
          document.getElementById('searchDiv').innerHTML='';
          inResult=[];
        }
        else{
          setSearch(val);
          document.getElementById('searchDiv').style.visibility='';
          console.log("here")
          let data = await fetch("/api/searchAPI", { method: "POST", body: JSON.stringify({ "arg": val }) });
          data=await data.json()
          console.log(data)
          for(let i=0;i<data.length;i++){
            if(inResult.indexOf(data[i]["id"])>-1){;}
            else{
              document.getElementById("searchDiv").innerHTML+=`
              <div class="card">
                <div class="card__details">
                  <div class="name">
                  ${data[i]["title"]}
                  </div>
                  <p style="font-size: 14px; color: #7f8c9b; line-height: 150%">${data[i]["description"]}</p>               
                </div>
                  <button class="cbutton" onClick="function a(){window.location.href='/formView?id=${data[i]['id']}'};a();" style={{color: 'white',borderColor: 'white'}}>Payout: ${data[i]['a']}</button>
                </div>`;
              inResult.push(data[i]["id"]);
            }
          }
        }
      }
      

return(
  <>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet"/>
    <div>
    <CssBaseline/>
    <style>
        {`
          body {
            background-color: #64CCC5;
            height: 100vh;
            color: #EEE;
          }
          section{
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 400px;
            padding: 100px 20vw;
          }
          .color1{
            background-color: #176B87;
          }
          .color2{
            background-color: #64CCC5;
            overflow: scroll;
          }
          .custom-shape-divider-top-1694366018 {
            left: 0;
            width: 100%;
            line-height: 0;
        }
        
          .custom-shape-divider-top-1694366018 svg {
            position: relative;
            display: block;
            width: calc(100% + 1.3px);
            height: 200px;
          }

          .custom-shape-divider-top-1694366018 .shape-fill {
            fill: #176B87;
          }
          .card {
            background-color: white;
            border: 1px solid #bacdd8;
            padding: 8px;
            border-radius: 12px;
            min-height:250px;
          }
          .name {
            font-size: 24px;
            font-weight: 600;
            margin-top: 16px;
            color: black
          }
          .cbutton {
            border: none;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 600;
            color: #0077ff;
            background-color: #e0efff;
            margin: 0 auto;
            display: block;
            cursor: pointer;
          }
          .card__details {
            padding: 16px 8px 8px 8px;
          }
        .cbutton:focus,
        .cbutton:hover {
          background-color: #0077ff;
          color: #e0efff;
        }

          @media (min-width: 768px) {
            .button-59 {
              min-width: 170px;
            }
          }
          .MuiTextField-root{
            background: white;
          }
          .MuiInputBase-input{
            background: white;
          }
          `}
      </style>
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
    <section className="color1" style={{fontSize: '4.2vw', flexDirection: 'row'}}>
          <p style={{zIndex: '20', marginRight:'20px'}}>GET PAID TO GIVE SURVEYS</p>
          <Button style={{color: '#EEE',borderColor:'#EEE', marginRight:'20px'}} variant="outlined" onClick={()=>window.location.href="/form"}>Create a Form</Button>
          <Button style={{color: '#EEE',borderColor:'#EEE', marginRight:'20px'}} variant="outlined" onClick={()=>window.location.href="/allforms"}>Latest forms</Button>
    </section>
    <div class="custom-shape-divider-top-1694366018">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
    </div>
    <section className="color2" style={{fontSize: '4.2vw', flexDirection: 'column'}}>
    <TextField id="searchforms" placeholder="Search Forms" value={search} onChange={(e)=>handleSearch(e.target.value)} sx={{color: '#ffffff'}} fullWidth/>
    <div id="searchDiv" style={{position: 'absolute', marginTop: '80px',height: '40%',width: '100%',backgroundColor: '#64CCC5',color: 'white',display: 'flex',flexDirection: 'row', gap: '5px', zIndex: '10'}}></div>
    </section>
  </>
)
}