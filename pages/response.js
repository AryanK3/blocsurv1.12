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
import { signIn, signOut, useSession, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { redirect } from 'next/navigation';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Bar } from "react-chartjs-2";
import { useRef } from "react";

export async function getServerSideProps(context) {
 
    const id = context.query.id;
    let data = await fetch("http://smartforms.tech/api/responseApi", { method: "POST", body: JSON.stringify({ "formUUID": id }) });
    data = await data.json();
    const session = await getSession(context);
    if (session.user.email !== data.email){
      return{
        props: {errorMessage: 'Authorize with the form maker'}
      }
    }
    
    let q2labels={};
    let q2data={};
    data=data.data;
    for(var key in data){
        q2labels[key]=[];
        for(var key1 in data[key]){
            q2labels[key].push(key1);
        }
    }
    for(var key in data){
        q2data[key]=[];
        for(var key1 in data[key]){
            q2data[key].push(data[key][key1]);
        }
    }
    return { props: { "q2labels": q2labels,"q2data": q2data} }
}


export default function Response({q2labels,q2data,errorMessage}){
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
    Chart.register(CategoryScale, LinearScale, BarElement)
    console.log(q2labels);
    console.log(q2data);
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
      <CssBaseline/>
        <AppBar position="static" sx={{minHeight: '5vh',maxHeight:'15vh', backgroundColor: "white"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
            BLOcksurvVEY
          </Typography>
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
      {Object.keys(q2labels).map((q)=>{
        return(
            <>
                <Typography variant="h3" marginTop="10px">{q}</Typography>
                <div id={q} zIndex="-1">
                <Bar
                    data={{
                    labels: q2labels[q],
                    datasets: [
                        {
                        data: q2data[q],
                        backgroundColor: ["#FE7BE5","#974EC3"],
                        },
                    ]
                    }}
                    height={300}
                    width={500}
                    options={{
                    maintainAspectRatio: false
                    }}
                />
                </div>
            </>
        )
        
    })}
        </>
    )
}
