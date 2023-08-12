import { ethers } from "ethers";
import { useState } from "react";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Box,
  Typography,
  Dialog, DialogTitle, DialogActions, DialogContent, Stepper, Step, StepLabel,
  AppBar, Toolbar,
  Divider,
  ButtonGroup,
  IconButton,
  CssBaseline,
  Accordion, AccordionSummary, AccordionDetails,
  Stack,
  Tooltip,
  Rating,
  Switch,
  Link,
  LinearProgress,
  Avatar
} from "@mui/material";


export default function pp() {
  const provider = new ethers.AlchemyProvider('sepolia', 'zfLkf49x6uCpGUh6J_of7j1DvxZXMoHz');
  const predefinedPrivateKey = '74bc64ba057d9af6a3a845e188f72ec572b003eca5493f492a22d6b8d3936e8b';

  const [metamaskAccount, setMetamaskAccount] = useState(null);
  const handleMetamaskSignIn = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const metamaskAccount = accounts[0];
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

  const handleButtonClick = async () => {
    const predefinedAccount = new ethers.Wallet(predefinedPrivateKey, provider);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const metamaskAccount = accounts[0];

    const response = await fetch('/api/calc');
    const { amount } = await response.json();
    const transaction = {
      to: metamaskAccount,
      value: ethers.parseEther(amount.toString()), 
    };

    const signedTransaction = await predefinedAccount.sendTransaction(transaction);
    console.log('Transaction sent:', signedTransaction);
    await fetch('/api/upd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <center>
    <div>
      <Button variant="outlined" onClick={handleMetamaskSignIn}>Sign In with MetaMask</Button><br></br><br></br>
      <Button variant="outlined" onClick={handleButtonClick}>Claim</Button>
      <h1>Submission Successfull!!</h1>
      <h2>MetaMask: {metamaskAccount}</h2>
    </div>
    </center>
  );
}
