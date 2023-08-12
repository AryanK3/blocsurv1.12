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
import { useSession } from 'next-auth/react'
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import StarIcon from '@mui/icons-material/Star';

import { ChromePicker } from "react-color";
import { v4 as uuid } from "uuid";

import { ethers } from 'ethers';
import InfiniteSeriesGraph from './graph';

export default function MyForm() {
  const { data: session } = useSession({ required: true });
  const [groups, setGroups] = useState([]);
  const [bgColor, setBgColor] = useState("#CA7878");
  const [openAccordion, setOpenAccordion] = useState(false);

  const [title, setTitle] = useState('Default Title');
  const [descr, setDescr] = useState('Default Description');
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [tempDescr, setTempDescr] = useState('');

  const [a, setA] = useState('');
  const [r, setR] = useState('');
  const [subopen, setSubOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Step 1', 'Step 2', 'Step 3'];
  const [graphopen, setGraphOpen] = useState(false);

  const [metamaskAccount, setMetamaskAccount] = useState(null);
  const [metamaskBalance, setMetamaskBalance] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleAddCbGroup = () => {
    const newGroup = {
      type: "checkbox",
      options: [{ id: uuid(), label: "Option 1" }],
      label: `Group ${groups.length + 1}`,
      id: uuid(),
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const handleAddRbGroup = () => {
    const newGroup = {
      type: "radio",
      options: [{ id: uuid(), label: "Option 1" }],
      label: `Group ${groups.length + 1}`,
      id: uuid(),
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const handleAddTfGroup = () => {
    const newGroup = {
      type: "text",
      label: `Group ${groups.length + 1}`,
      id: uuid(),
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const handleAddSlGroup = () => {
    const newGroup = {
      type: "slider",
      label: `Group ${groups.length + 1}`,
      id: uuid(),
      min: { value: "0", label: "Min" },
      max: { value: "5", label: "Max" },
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const handleAddRtGroup = () => {
    const newGroup = {
      type: "rating",
      label: `Group ${groups.length + 1}`,
      id: uuid(),
      precision: false,
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const handleAddDpGroup = () => {
    const newGroup = {
      type: "dropdown",
      options: [{ id: uuid(), label: "Option 1" }],
      label: `Group ${groups.length + 1}`,
      id: uuid(),
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const handleAddOption = (groupId) => {
    setGroups((prevGroups) => {
      const groupIndex = prevGroups.findIndex((group) => group.id === groupId);
      if (groupIndex > -1) {
        const newOption = {
          id: uuid(),
          label: `Option ${prevGroups[groupIndex].options.length + 1}`,
        };
        const updatedGroups = [...prevGroups];
        updatedGroups[groupIndex].options.push(newOption);
        return updatedGroups;
      } else {
        return prevGroups;
      }
    });
  };

  const handleRemoveGroup = (groupId) => {
    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.filter((group) => group.id !== groupId);
      return updatedGroups;
    });
  };

  const handleRemoveOption = (groupId, optionId) => {
    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.map((group) => {
        if (group.id === groupId) {
          const updatedOptions = group.options.filter((option) => option.id !== optionId);
          const updatedGroup = { ...group, options: updatedOptions };
          return updatedGroup;
        } else {
          return group;
        }
      });
      return updatedGroups;
    });
  };

  const handleGroupLabelChange = (groupId, newLabel) => {
    setGroups((prevGroups) => {
      const groupIndex = prevGroups.findIndex((group) => group.id === groupId);
      const updatedGroups = [...prevGroups];
      updatedGroups[groupIndex] = {
        ...updatedGroups[groupIndex],
        label: newLabel
      };
      return updatedGroups;
    });
  };


  const handleOptionLabelChange = (groupId, optionId, newLabel) => {
    setGroups((prevGroups) => {
      const groupIndex = prevGroups.findIndex((group) => group.id === groupId);
      if (groupIndex > -1) {
        const optionIndex = prevGroups[groupIndex].options.findIndex((option) => option.id === optionId);
        if (optionIndex > -1) {
          const updatedOptions = [...prevGroups[groupIndex].options];
          updatedOptions[optionIndex].label = newLabel;
          const updatedGroups = [...prevGroups];
          updatedGroups[groupIndex].options = updatedOptions;
          return updatedGroups;
        }
      }
      return prevGroups;
    });
  };

  const handleSliderOptionChange = (groupId, valueType, value) => {
    setGroups((prevGroups) => {
      const groupIndex = prevGroups.findIndex((group) => group.id === groupId);
      if (groupIndex > -1) {
        const updatedGroups = [...prevGroups];
        updatedGroups[groupIndex][valueType].value = Number(value);
        return updatedGroups;
      } else {
        return prevGroups;
      }
    });
  };

  const handleSliderLabelChange = (groupId, valueType, label) => {
    setGroups((prevGroups) => {
      const groupIndex = prevGroups.findIndex((group) => group.id === groupId);
      if (groupIndex > -1) {
        const updatedGroups = [...prevGroups];
        updatedGroups[groupIndex][valueType].label = label;
        return updatedGroups;
      } else {
        return prevGroups;
      }
    });
  };

  const handlePrecisionChange = (groupId) => {
    setGroups((prevGroups) => {
      return prevGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            precision: !group.precision
          };
        }
        return group;
      });
    });
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setTempTitle(title);
    setTempDescr(descr);
  };
  const handleSaveClick = () => {
    setTitle(tempTitle);
    setDescr(tempDescr);
    setIsEditMode(false);
  };
  const handleCancelClick = () => {
    setIsEditMode(false);
  };
  const handleTitleChange = (event) => {
    setTempTitle(event.target.value);
  };
  const handleDescrChange = (event) => {
    setTempDescr(event.target.value);
  };

  const handleAccordionToggle = () => {
    setOpenAccordion(!openAccordion);
  };

  const handleColorPickerChange = (color) => {
    setBgColor(color.hex);
  };

  const handleMetamaskSignIn = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const metamaskAccount = accounts[0];
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(metamaskAccount);
        const balanceInEther = ethers.formatEther(balance);
        setMetamaskAccount(metamaskAccount);
        setMetamaskBalance(balanceInEther);
      }
      else {
        console.error('MetaMask not detected');
        alert('MetaMask not detected')
      }
    } catch (error) {
      console.error('Failed to sign in with MetaMask:', error);
    }
  };

  const validateFields = () => {
    const labelErrors = groups.some((group) => {
      if (!group.label || group.label.trim() === "") {
        return true;
      }
      if (group.type === "checkbox" || group.type === "radio" || group.type === "dropdown") {
        return group.options.some((option) => !option.label || option.label.trim() === "");
      }
      return false;
    });
    return !labelErrors;
  };

  const handleSubNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleSubBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubClose = () => {
    if (!uploading) {
      setSubOpen(false);
      setActiveStep(0);
    }
  };

  const handleGraphClose = () => {
    setGraphOpen(false);
  };

  const sendEth = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        setUploading(true);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const toAddress = '0x9D83444AA564E28b72132EA592e8233b0D17c46D';
        const amount = ethers.parseEther(a);

        const transaction = await signer.sendTransaction({
          to: toAddress,
          value: amount,
        });
        const transactionHash = transaction.hash;
        const trans = await provider.getTransaction(transactionHash);
        const val = Number(ethers.formatEther(trans.value));
        const addr = trans.to

        if (addr === toAddress) {
          await upload(val)
          alert('Form uploaded successfully. Welcome!');
          window.location.reload();
        }
        else {
          alert('Your form wasnt uploaded because you transferred funds to the wrong account!')
          setUploading(false);
        }
      }
    }
    catch (error) {
      console.error('Failed to send ETH:', error);
      setUploading(false);
    }
  };


  async function upload(val) {
    const jsonObject = {
      title: title,
      description: descr,
      name: session.user.email,
      time: moment().format("DD-MM_YYYY hh:mm:ss"),
      groups: groups,
      a: val,
      r: Number(r),
      p: 0,
      color: bgColor,
      id: uuid(),
    };
    await fetch('/api/mongo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(jsonObject) })
  }

  return (
    <div>
      <CssBaseline />
      <style>
        {`
          body {
            background-color: ${bgColor};
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
            <Button onClick={() => setGraphOpen(true)}>estimate</Button>
            <Button onClick={() => setSubOpen(true)} disabled={!validateFields() || !groups.length}>submit</Button>
            {session && session.user && (
              <Tooltip title={session.user.email} placement="bottom">
                <Avatar
                  alt={session.user.name}
                  src={session.user.image}
                  sx={{ marginLeft: "10px", cursor: "pointer" }}
                />
              </Tooltip>)}
          </Toolbar>
        </AppBar>
      </div>
      <div>

        <form>
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

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                onClick={handleEditClick}
                sx={{ position: 'absolute', top: '5px', right: '5px' }}
              >
                <EditIcon />
              </IconButton>
            </Box>
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
                {title}
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
              <Typography variant="body1">{descr}</Typography>
            </Box>

            <Dialog open={isEditMode} onClose={handleCancelClick}>
              <DialogTitle>Edit Title and Description</DialogTitle>
              <Box sx={{ p: 2 }}>
                <TextField
                  label="Title"
                  variant="standard"
                  fullWidth
                  value={tempTitle}
                  onChange={handleTitleChange}
                  sx={{ mb: 3 }}
                  error={!tempTitle.trim()}
                  helperText={!tempTitle.trim() ? "Title cannot be empty" : ""}
                />
                <TextField
                  label="Description"
                  variant="standard"
                  fullWidth
                  value={tempDescr}
                  onChange={handleDescrChange}
                  sx={{ mb: 1 }}
                  error={!tempDescr.trim()}
                  helperText={!tempDescr.trim() ? "Description cannot be empty" : ""}
                />
              </Box>
              <DialogActions>
                <Button onClick={handleCancelClick}>Cancel</Button>
                <Button onClick={handleSaveClick} disabled={!tempTitle.trim() || !tempDescr.trim()}>Save</Button>
              </DialogActions>
            </Dialog>
          </Box>

          <Dialog open={subopen} onClose={handleSubClose}>
            <DialogTitle>Upload Form</DialogTitle>
            <DialogContent
              sx={{
                width: 420,
                height: 400,
                display: 'stack',
                padding: '30px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div>
                <Stepper activeStep={activeStep} alternativeLabel >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div> <br />
              {activeStep === 0 && (
                <div sx={{ paddingTop: '10px' }}>
                  <Button variant="outlined" onClick={handleMetamaskSignIn}>Sign In with MetaMask</Button><br />
                  <br /><Typography>Account:</Typography><Typography>{metamaskAccount}</Typography><br />
                  <Typography>Balance:</Typography><Typography>{metamaskBalance}</Typography> <br />
                  <Button onClick={handleSubNext} disabled={!metamaskAccount}>Next</Button>
                </div>
              )}

              {activeStep === 1 && (
                <div>
                  <Link href="/graph" underline="hover" target="_blank">
                    {'Estimate Customers and Cost with Graph'}
                  </Link><br /><br />
                  <TextField
                    label="Enter Amount:"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    sx={{ marginTop: '10px' }}
                    inputProps={{
                      pattern: /^\d*\.?\d*$/,
                    }}
                    error={!/^\d*\.?\d*$/.test(a) || parseFloat(a) <= 0 || parseFloat(a) >= parseFloat(metamaskBalance)}
                    helperText={!/^\d*\.?\d*$/.test(a) || parseFloat(a) <= 0 ? "Only positive numbers are allowed" : "" || parseFloat(a) >= parseFloat(metamaskBalance) ? "a value must be less than the account balance" : ""}
                  />
                  <br /><br />
                  <TextField
                    label="Multiplier:"
                    value={r}
                    onChange={(e) => setR(e.target.value)}
                    sx={{ marginTop: '10px', marginBottom: '10px' }}
                    inputProps={{
                      pattern: /^\d*\.?\d*$/,
                    }}
                    error={!/^\d*\.?\d*$/.test(r) || parseFloat(r) <= 0 || parseFloat(r) < 0.5 || parseFloat(r) > 0.99}
                    helperText={!/^\d*\.?\d*$/.test(r) || parseFloat(r) <= 0 ? "Only positive numbers are allowed" : "" || parseFloat(r) < 0.5 || parseFloat(r) > 0.99 ? "r value must be between 0.5 and 0.99" : ""}
                  />
                  <Typography>For example: let multiplier=0.9, if 3rd user paid $10, 4th user will be paid $10*0.9= $9</Typography>
                  <Button onClick={handleSubNext} disabled={!a || !r || !/^\d*\.?\d*$/.test(a) || !/^\d*\.?\d*$/.test(r) || parseFloat(a) <= 0 || parseFloat(r) <= 0 || parseFloat(a) >= parseFloat(metamaskBalance) || parseFloat(r) < 0.5 || parseFloat(r) > 0.99}>
                    Next</Button>
                </div>
              )}

              {activeStep === 2 && (
                <div>
                  {uploading && <LinearProgress />}
                  <Typography>Note: The metamask dialog will open with our toAaddress. Ensure you dont change the toAddress, else your form will not be uploaded to our servers.</Typography>
                  <br /><Typography>You can edit the Amount in the metamask dialog, it will be updated in our servers.</Typography>
                  <br /><Typography>Click the below button to open metamask dialog. Welcome to the BLOcksurvVEY family!</Typography>
                  <Button variant="contained" onClick={sendEth} sx={{ marginBottom: '10px' }} disabled={uploading} >
                    {uploading ? 'Uploading...' : 'Pay and Upload Form'}
                  </Button>
                </div>
              )}
              <div>
                <Button disabled={activeStep === 0 || uploading} onClick={handleSubBack}>Back</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={graphopen} onClose={handleGraphClose}>
            <DialogContent
              sx={{
                width: 800,
                height: 600,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '80%', height: '80%' }}>
                <InfiniteSeriesGraph a={a} r={r} />
              </div>
            </DialogContent>
          </Dialog>

          <Box position="relative">
            <div onClick={handleAccordionToggle} style={{ cursor: openAccordion ? 'auto' : 'pointer' }}>
              <Accordion
                expanded={openAccordion}
                onChange={handleAccordionToggle}
                sx={{
                  position: 'absolute',
                  top: '10px',
                  left: 0,
                  zIndex: 2,
                  height: openAccordion ? '335px' : '335px',
                  width: openAccordion ? '270px' : '40px',
                  transition: 'width 0.3s',
                  overflow: 'hidden',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{
                      fontSize: openAccordion ? '20px' : '20px',
                      transform: openAccordion ? 'none' : 'rotate(-90deg)',
                      transition: 'transform 0.2s',
                      whiteSpace: 'nowrap',
                      textOrientation: 'upright',
                      transformOrigin: openAccordion ? 'top left' : 'center',
                      paddingTop: openAccordion ? 0 : '20px',
                      paddingRight: openAccordion ? 0 : '250.5px'
                    }}
                  >
                    Toggle Color Picker
                  </Typography>
                </AccordionSummary>
                <AccordionDetails onClick={(e) => e.stopPropagation()} sx={{ marginTop: '-9px' }}>
                  <Box width="100%">
                    <ChromePicker color={bgColor} onChange={handleColorPickerChange} />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
          </Box>



          {groups.map((group, index) => (
            <Box
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

              <TextField
                label={`Question (${group.type})`}
                defaultValue={group.label || `Group ${index + 1}`}
                onChange={(e) => handleGroupLabelChange(group.id, e.target.value)}
                error={!group.label || group.label.trim() === ""}
                helperText={!group.label || group.label.trim() === "" ? "Label cannot be empty" : ""}
              />

              {group.type === "checkbox" ? (
                <FormGroup style={{ display: "flex", flexDirection: "row" }}>
                  <ol>
                    <Stack spacing={1}>
                      {group.options.map((option) => (
                        <li key={option.id} style={{ marginRight: "16px" }}>
                          <FormControlLabel
                            control={
                              <Checkbox disabled />
                            }
                            label={
                              <TextField
                                label='Option Label'
                                value={option.label}
                                onChange={(e) => handleOptionLabelChange(group.id, option.id, e.target.value)}
                                error={!option.label || option.label.trim() === ""}
                                helperText={!option.label || option.label.trim() === "" ? "Label cannot be empty" : ""}
                              />
                            }
                          />
                          <Button
                            onClick={() => handleRemoveOption(group.id, option.id)}
                            disabled={group.options.length <= 1}
                          >
                            Remove Option
                          </Button>
                        </li>
                      ))}
                      <li>
                        <Button onClick={() => handleAddOption(group.id)}>Add Option</Button>
                      </li>
                    </Stack>
                  </ol>
                </FormGroup>

              ) : group.type === "radio" ? (
                <RadioGroup
                  style={{ display: "flex", flexDirection: "row" }}
                ><ol>
                    <Stack spacing={1}>
                      {group.options.map((option) => (
                        <li key={option.id} style={{ marginRight: "16px" }}>
                          <FormControlLabel
                            value={option.value}
                            control={<Radio disabled />}
                            label={
                              <TextField
                                label='Option Label'
                                value={option.label}
                                onChange={(e) => handleOptionLabelChange(group.id, option.id, e.target.value)}
                                error={!option.label || option.label.trim() === ""}
                                helperText={!option.label || option.label.trim() === "" ? "Label cannot be empty" : ""}
                              />
                            }
                          />
                          <Button
                            onClick={() => handleRemoveOption(group.id, option.id)}
                            disabled={group.options.length <= 1}
                          >
                            Remove Option
                          </Button>
                        </li>
                      ))}
                      <li>
                        <Button onClick={() => handleAddOption(group.id)}>Add Option</Button>
                      </li>
                    </Stack>
                  </ol>
                </RadioGroup>

              ) : group.type === "text" ? (
                <div>
                  <TextField fullWidth disabled variant="filled" sx={{ marginTop: '10px' }} />
                </div>

              ) : group.type === "slider" ? (
                <div>
                  <FormControlLabel
                    sx={{ marginTop: '10px', marginLeft: '5px' }}
                    control={
                      <Select
                        value={group.min.value}
                        onChange={(e) =>
                          handleSliderOptionChange(group.id, "min", e.target.value)
                        }
                      >
                        <MenuItem value="0">0</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                      </Select>
                    }
                    label={
                      <TextField
                        label="Min"
                        value={group.min.label}
                        onChange={(e) =>
                          handleSliderLabelChange(group.id, "min", e.target.value)
                        }
                      />
                    }
                  />

                  <FormControlLabel
                    sx={{ marginTop: '10px' }}
                    control={
                      <Select
                        value={group.max.value}
                        onChange={(e) =>
                          handleSliderOptionChange(group.id, "max", e.target.value)
                        }
                      >
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                      </Select>
                    }
                    label={
                      <TextField
                        label="Max"
                        value={group.max.label}
                        onChange={(e) =>
                          handleSliderLabelChange(group.id, "max", e.target.value)
                        }
                      />
                    }
                  />
                </div>
              )

                : group.type === "rating" ? (
                  <div>
                    <Rating
                      size="large"
                      value={null}
                      precision={group.precision ? 0.5 : 1}
                      sx={{
                        fontSize: '3rem',
                      }}
                    />
                    <Typography variant="body1">Toggle Half Stars:</Typography>
                    <Switch
                      checked={group.precision}
                      onChange={() => handlePrecisionChange(group.id)}
                    />
                  </div>
                )

                  : group.type === "dropdown" ? (
                    <ol>
                      <Stack spacing={1}>
                        {group.options.map((option) => (
                          <li key={option.id}>
                            <TextField
                              label='Option Label'
                              value={option.label}
                              onChange={(e) => handleOptionLabelChange(group.id, option.id, e.target.value)}
                              error={!option.label || option.label.trim() === ""}
                              helperText={!option.label || option.label.trim() === "" ? "Label cannot be empty" : ""}
                            />
                            <Button
                              onClick={() => handleRemoveOption(group.id, option.id)}
                              disabled={group.options.length <= 1}
                            >
                              Remove Option
                            </Button>
                          </li>
                        ))}
                        <li>
                          <Button onClick={() => handleAddOption(group.id)}>Add Option</Button>
                        </li>
                      </Stack>
                    </ol>
                  ) : null}

              <Button onClick={() => handleRemoveGroup(group.id)}>Remove Group</Button>
            </Box>
          ))}

          <ButtonGroup
            orientation="vertical"
            sx={{
              position: "sticky",
              marginLeft: "86%",
              zIndex: 2,
              width: "6.5%",
              backgroundColor: "white",
              borderRadius: '5px'
            }}
          >
            <Stack direction="column" spacing={2}>
              <Tooltip title="Add Radio Group" placement="left-start">
                <IconButton onClick={handleAddRbGroup}>
                  <RadioButtonCheckedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add TextField Group" placement="left-start">
                <IconButton onClick={handleAddTfGroup}>
                  <TextFieldsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Checkbox Group" placement="left-start">
                <IconButton onClick={handleAddCbGroup}>
                  <CheckBoxIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Dropdown Group" placement="left-start">
                <IconButton onClick={handleAddDpGroup}>
                  <ArrowDropDownCircleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Slider Group" placement="left-start">
                <IconButton onClick={handleAddSlGroup}>
                  <LinearScaleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Rating Group" placement="left-start">
                <IconButton onClick={handleAddRtGroup}>
                  <StarIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </ButtonGroup>

        </form>
      </div>
    </div>
  );
}
