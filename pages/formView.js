    import { useSession, signIn, signOut } from 'next-auth/react';
    import { ethers } from "ethers";
    import {
        Button,
        FormControlLabel,
        FormGroup,
        Radio,
        Slider,
        Rating,
        RadioGroup,
        TextField,
        Checkbox,
        InputLabel,
        FormControl,
        Select,
        Link,
        Box,
        Typography,
        Dialog, DialogTitle, DialogActions,
        AppBar, Toolbar,
        Divider,
        ButtonGroup,
        IconButton, ListItemIcon,
        CssBaseline,
        Stack,
        Tooltip,
        Avatar,
        Menu, MenuItem,
    } from "@mui/material";
    import { useState } from 'react';
    import Logout from '@mui/icons-material/Logout';
    import AccountCircleIcon from '@mui/icons-material/AccountCircle';

    export async function getServerSideProps(context) {
        const id = context.query.id;
        let data = await fetch("http://localhost:3000/api/findForm", { method: "POST", body: JSON.stringify({ "id": id }) });
        data = await data.json();
        return { props: { "data": data , "id": id} }
    }

    export default function FormView({ data,id }) {
        const { data: session } = useSession({ required: true });
        const provider = new ethers.AlchemyProvider('sepolia', 'zfLkf49x6uCpGUh6J_of7j1DvxZXMoHz');
        const [metamaskAccount, setMetamaskAccount] = useState(null);
        const [selectedRadioOptions, setSelectedRadioOptions] = useState({});
        const [selectedCheckboxOptions, setSelectedCheckboxOptions] = useState({});
        const [textValidity, setTextValidity] = useState({});

        const handleMetamaskSignIn = async () => {
            try {
                if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const metamaskAccount = accounts[0];
                document.getElementById("metamask").innerHTML=metamaskAccount;
                document.getElementById("metamask").disabled=true;
                setMetamaskAccount(metamaskAccount);
                }
                else {
                console.error('MetaMask not detected');
                alert('MetaMask not detected')
                }
            } catch (error) {
                console.error('Failed to sign in with MetaMask:', error);
            }
        };
        data = data["data"][0]; //data dictionary has data key
        let groups = data.groups;

        const [arr, setArr] = useState(() => {
            const initialArr = {};
            for (let i = 0; i < groups.length; i++) {
                if (groups[i].type === "rating" || groups[i].type === "dropdown") {
                    initialArr[groups[i].id] = '';
                }
            }
            return initialArr;
        });
                
        const changeHandler = e => {
            const updatedArr = { ...arr, [e.target.name]: e.target.value };
            setArr(updatedArr); 
            document.getElementById(e.target.name).value = e.target.value;

            if (groups.find(group => group.id === e.target.name)?.type === "text") {
                const isTextValid = e.target.value.trim() !== ""; 
                setTextValidity((prevValidity) => ({
                  ...prevValidity,
                  [e.target.name]: isTextValid,
                }));
              }
        };
    
        const radioChangeHandler = (groupId, selectedOption) => {
            setSelectedRadioOptions((prevOptions) => ({
              ...prevOptions,
              [groupId]: selectedOption,
            }));
          };

        const checkboxChangeHandler = (groupId, optionLabel, isChecked) => {
            setSelectedCheckboxOptions((prevSelections) => ({
              ...prevSelections,
              [groupId]: isChecked
                ? [...(prevSelections[groupId] || []), optionLabel]
                : prevSelections[groupId].filter((label) => label !== optionLabel),
            }));
          };          

          const textChangeHandler = (groupId, value) => {
            const isTextValid = value.trim() !== ""; 
            setTextValidity((prevValidity) => ({
              ...prevValidity,
              [groupId]: isTextValid,
            }));
          };          
            
    const validateForm = () => {
        const allGroupsValid = groups.every((group) => {
            if (group.type === "radio") {
                return !!selectedRadioOptions[group.id];
            }
            if (group.type === "checkbox") {
                return selectedCheckboxOptions[group.id]?.length > 0;
            }
            if (group.type === "text") {
                return textValidity[group.id] === true;
            }
            return true; 
        });
        const isAnyValueEmpty = Object.values(arr).some(value => value.trim() === "");
        return !allGroupsValid || isAnyValueEmpty || !metamaskAccount;        
    };          
              
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

    return (
        <div>
            <CssBaseline />
            <style>
                {`
                    body {
                        background-color: ${data.color};
                        height: 100vh;
                    }
                    .sb{
                        background-color: #176b87; 
                        border: none;
                        color: white;
                        padding: 16px 32px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        margin: 4px 2px;
                        transition-duration: 0.4s;
                        cursor: pointer;
                      } 
                      .sb:hover {
                        background-color: green;
                        color: white;
                      }
                      .sb:disabled{
                        opacity: 0.6;
                        cursor: not-allowed;
                        }
                `}
            </style>
            <div>
                <AppBar position="static" sx={{ minHeight: '5vh', maxHeight: '15vh', marginBottom: '10px', backgroundColor: "white", color:"black" }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
                            BLOcksurvVEY
                        </Typography>
                        <Button id="metamask" variant="outlined" onClick={handleMetamaskSignIn}>Sign In with MetaMask</Button>

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
                <form action='/api/pay' method='post'>
                    <input type="hidden" name="formid" value={id}></input>
                    <input type="hidden" name="email" value={session && session.user && session.user.email}></input>
                    <input type="hidden" name="meta" value={metamaskAccount}></input>
                    <Box
                        sx={{
                            width: '72%',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            p: 2,
                            margin: '0 auto',
                            overflowWrap: 'break-word',
                            wordBreak: 'break-all',
                            wordWrap: 'break-word',
                            position: 'relative',
                            borderLeft: '5px solid #E7DECC',
                            borderTop: '5px solid #E7DECC',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                minHeight: '10vh',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                            }}
                        >
                            <Typography variant="h3" sx={{ maxWidth: '95%' }}>
                                {data.title}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                minHeight: '10vh',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                            }}
                        >
                            <Typography variant="body1">{data.description}</Typography>
                        </Box>
                    </Box>
                    {groups.map((group) => {

                        return <Box
                            key={group.id}
                            sx={{
                                backgroundColor: 'white',
                                p: 2,
                                borderRadius: '6px',
                                position: 'relative',
                                width: '69%',
                                borderLeft: '5px solid #E2D3CD',
                                margin: '0 auto',
                                marginBottom: '10px',
                                marginTop: '10px',
                            }}
                        >
                            <Typography variant="h6">{group.label}</Typography>
                            <Divider sx={{marginBottom:'10px'}}/>                            
                            
                            {group.type === "checkbox" ? (
                                    <FormGroup style={{ display: "flex", flexDirection: "row" }}>
                                        <ol>
                                            {group.options.map((option) => (
                                                <li key={option.id} style={{ marginRight: "16px" }}>
                                                    <FormControlLabel name={group.id} value={option.label} 
                                                        control={ 
                                                            <Checkbox
                                                            checked={selectedCheckboxOptions[group.id]?.includes(option.label) || false}
                                                            onChange={(e) => checkboxChangeHandler(group.id, option.label, e.target.checked)}
                                                          />}
                                                        label={<Typography variant="body1">{option.label}</Typography>}
                                                /></li>
                                            ))}
                                        </ol>
                                    </FormGroup>
                                ) : group.type === "radio" ? (
                                  <RadioGroup
                                    style={{ display: "flex", flexDirection: "row" }}
                                    value={selectedRadioOptions[group.id] || ""}
                                    onChange={(event) => radioChangeHandler(group.id, event.target.value)}>                            
                                    <ol>
                                        {group.options.map((option) => (
                                            <li key={option.id} style={{ marginRight: "16px" }}>
                                                <FormControlLabel
                                                    name={group.id}
                                                    value={option.label}
                                                    control={<Radio />}
                                                    label={
                                                        <Typography variant="body1">{option.label}</Typography>
                                                    }
                                                />
                                            </li>
                                        ))}
                                    </ol>
                                </RadioGroup>
                                ) : group.type === "text" ? (
                                    <div>
                                        <TextField name={group.id} fullWidth variant="filled" sx={{ marginTop: '10px' }} 
                                            onChange={(e) => textChangeHandler(group.id, e.target.value)}/>
                                    </div>
                                ) : group.type === "dropdown" ? (
                                    <div>
                                        <FormControl fullWidth>
                                            <Select
                                                name={group.id}
                                                id={group.id}
                                                onChange={changeHandler}
                                            >
                                                {group.options.map((option) => (
                                                    <MenuItem key={option.label} value={option.label}>{option.label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                ) : group.type === "slider" ? (
                                    <div>
                                        <Slider
                                            aria-label={group.label}
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={Number(group.min.value)}
                                            max={Number(group.max.value)}
                                            name={group.id}
                                        />
                                    </div>
                                ) : group.type === "rating" ? (
                                    <div>
                                        <Rating
                                            size="large"
                                            name={group.id}
                                            id={group.id}
                                            precision={group.precision ? 0.5 : 1}
                                            sx={{
                                                fontSize: '3rem',
                                            }}
                                            value={parseFloat(arr[group.id]) || 0}
                                            onChange={
                                                (e) => changeHandler(e, group.id)                                            
                                            }
                                        />
                                    </div>
                                ) : null
                            }
                        </Box>
                    })}
                <button type="submit" class="sb" disabled={validateForm()}>Submit</button>
                </form>
            </div>
        </div >
    )
}
