import {
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Link
} from "@mui/material";

export default function howto(){
return(
  <>
    <div>
    <CssBaseline/>
    <AppBar position="static" sx={{ minHeight: '5vh', maxHeight: '15vh', marginBottom: '10px', backgroundColor: "white" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
          BLOcksurvVEY
        </Typography>
      </Toolbar>
    </AppBar>
    </div>
    <Typography variant="h3" sx={{marginTop: "20px"}}>First install Metamask browser extension for your wallet</Typography>
    <Link href="https://metamask.io/download">https://metamask.io/download</Link>
    <Typography variant="h3" sx={{marginTop: "40px"}}>Then sign in with Google to our website to access forms and dashboard :)</Typography>
    <Link href="http://localhost:3000">Back to home</Link><br></br><br></br><br></br>
    <Link href="mailto:hax0037@gmail.com?subject=Feedback&body=Message">Contact Us</Link>
  </>
)
}