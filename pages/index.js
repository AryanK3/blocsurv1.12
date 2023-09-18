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
  TextField
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
          let data = await fetch("http://localhost:3000/api/searchAPI", { method: "POST", body: JSON.stringify({ "arg": val }) });
          data=await data.json()
          for(let i=0;i<data.length;i++){
            if(inResult.indexOf(data[i]["id"])>-1){;}
            else{
              document.getElementById("searchDiv").innerHTML+=`<Button class="button-59" onClick="function a(){window.location.href='http://localhost:3000/formView?id=${data[i]['id']}'};a();" style={{color: 'white',borderColor: 'white'}}>${data[i]["title"]}</Button>`;
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
            background-color: #974EC3;
            height: 100vh;
            color: white;
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
            background-color: #FE7BE5;
          }
          .color2{
            background-color: #974EC3;
          }
          .custom-shape-divider-top-1694366018 {
            left: 0;
            width: 100%;
            overflow: hidden;
            line-height: 0;
        }
        
          .custom-shape-divider-top-1694366018 svg {
            position: relative;
            display: block;
            width: calc(100% + 1.3px);
            height: 247px;
          }

          .custom-shape-divider-top-1694366018 .shape-fill {
            fill: #FE7BE5;
          }
          .card{
            width: 50%;
            min-width:200px;
            height: 70%;
            background-color: #FE7BE5;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius:20px;
            font-size: 200%;
          }
          .button-59 {
            align-items: center;
            background-color: #fff;
            border: 2px solid #000;
            box-sizing: border-box;
            color: #000;
            cursor: pointer;
            display: inline-flex;
            fill: #000;
            font-family: Inter,sans-serif;
            font-size: 16px;
            font-weight: 600;
            height: 48px;
            justify-content: center;
            letter-spacing: -.8px;
            line-height: 24px;
            min-width: 140px;
            outline: 0;
            padding: 0 17px;
            text-align: center;
            text-decoration: none;
            transition: all .3s;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
          }

          .button-59:focus {
            color: #171e29;
          }

          .button-59:hover {
            border-color: #FE7BE5;
            color: #FE7BE5;
            fill: #FE7BE5;
          }

          .button-59:active {
            border-color: #FE7BE5;
            color: #FE7BE5;
            fill: #FE7BE5;
          }

          @media (min-width: 768px) {
            .button-59 {
              min-width: 170px;
            }
          }
          `}
      </style>
    <AppBar position="static" sx={{minHeight: '5vh',maxHeight:'15vh', backgroundColor: "white"}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
          BLOcksurvVEY
        </Typography>
        <TextField placeholder="Search Forms" value={search} style={{width: '15vw'}} onChange={(e)=>handleSearch(e.target.value)}/>
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
    </div>
    <div id="searchDiv" style={{height: '40%',width: '100%',backgroundColor: '#974EC3',visibility: 'hidden',color: 'white',display: 'flex',flexDirection: 'row', gap: '5px'}}></div>
    <section className="color1" style={{fontSize: '4vw'}}>
          <p>GET PAID FOR GIVING SURVEYS</p>
    </section>
    <div class="custom-shape-divider-top-1694366018">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
  </div>
    <section className="color2">
    <div style={{position: 'absolute',width: '80%', height: '70%', left:'10%',display: 'flex',flexDirection: 'row',gap: '20px', overflowX: 'scroll'}}>
        <div class="card">
          <p>Design Form</p>
          <Button style={{color: 'white',borderColor:'white'}} variant="outlined" onClick={()=>window.location.href="http://localhost:3000/form"}>Click Here!</Button>
        </div>
        <div class="card">
        <p>Dashboard</p>
        <Button style={{color: 'white',borderColor:'white'}} variant="outlined" onClick={()=>window.location.href="http://localhost:3000/dashboard"}>Click Here!</Button>
        </div>
      </div>
    </section>
  </>
)
}