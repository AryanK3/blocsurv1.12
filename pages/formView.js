import { GroupAdd } from "@mui/icons-material";
import { useState } from "react";
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
    MenuItem,
    Box,
    Typography,
    Dialog, DialogTitle, DialogActions,
    AppBar, Toolbar,
    Divider,
    ButtonGroup,
    IconButton,
    CssBaseline,
    Accordion, AccordionSummary, AccordionDetails,
    Stack,
    Tooltip
} from "@mui/material";
import psSupported from "jsonwebtoken/lib/psSupported";

export async function getServerSideProps(context) {
    const id = context.query.id;
    let data = await fetch("http://localhost:3000/api/findForm", { method: "POST", body: JSON.stringify({ "id": id }) });
    data = await data.json();
    return { props: { "data": data } }
}

export default function formView({ data }) {
    data = data["data"][0]; //data dictionary has data key
    let groups = data.groups;
    let arr = {};
    for (let i = 0; i < groups.length; i++) {
        if (groups[i].type == "rating" || groups[i].type == "dropdown") {
            arr[groups[i].id] = '';
        }
    }
    console.log(arr);
    const [a, setA] = useState(arr);
    const changeHandler = e => {
        arr[e.target.name] = e.target.value;
        document.getElementById(e.target.name).value=e.target.value;
    }
    console.log(groups);
    return (
        <div>
            <CssBaseline />
            <style>
                {`
                    body {
                        background-color: ${data.color};
                        height: 100vh;
                    }
                `}
            </style>
            <div>
                <AppBar position="static" sx={{ minHeight: '5vh', maxHeight: '15vh', marginBottom: '10px', backgroundColor: "white" }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
                            BLOcksurvVEY
                        </Typography>
                    </Toolbar>
                </AppBar>
                <form action='/submission' method='post'>
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
                            borderLeft: '5px solid #4E1313',
                            borderTop: '5px solid #813939',
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
                                borderLeft: '5px solid #4E1313',
                                margin: '0 auto',
                                marginBottom: '10px',
                                marginTop: '10px',
                            }}
                        >

                            <Typography variant="body1">{group.label}</Typography>
                            {
                                group.type === "checkbox" ? (

                                    <FormGroup style={{ display: "flex", flexDirection: "row" }}>
                                        <ol>
                                            {group.options.map((option) => (
                                                <li key={option.id} style={{ marginRight: "16px" }}>
                                                    <FormControlLabel name={group.id} value={option.label}
                                                        control={
                                                            <Checkbox />
                                                        }
                                                        label={
                                                            <Typography variant="body1">{option.label}</Typography>
                                                        }
                                                    />
                                                </li>
                                            ))}
                                        </ol>
                                    </FormGroup>
                                ) : group.type === "radio" ? (
                                    <RadioGroup
                                        style={{ display: "flex", flexDirection: "row" }}
                                    ><ol>
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
                                        <TextField name={group.id} fullWidth variant="filled" sx={{ marginTop: '10px' }} />
                                    </div>
                                ) : group.type === "dropdown" ? (
                                    <div>
                                        <FormControl fullWidth>
                                            <Select
                                                name={group.id}
                                                label={group.label}
                                                id={group.id}
                                                onChange={changeHandler}
                                            >
                                                {group.options.map((option) => (
                                                    <MenuItem value={option.label}>{option.label}</MenuItem>
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
                                            onChange={changeHandler}
                                        />
                                    </div>
                                ) : null
                            }
                        </Box>
                    })}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div >
    )
}