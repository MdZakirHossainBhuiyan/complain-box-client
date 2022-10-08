import React, { useContext, useState } from 'react';
import './ComplainBox.css';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { UserContext } from '../../../App';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Modal, } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ComplainBox = ({state}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {_id, userName, userEmail} = loggedInUser;
    const [inputValue, setInputValue] = useState(null);
    const [inputFile, setInputFile] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleBlur = e => {
        const allValue = {...inputValue};
        allValue[e.target.name] = e.target.value;
        setInputValue(allValue);
    }

    const handleChange = e => {
        const newFile = e.target.files[0];
        setInputFile(newFile);
    }

    const handleSubmit = e => {
        e.preventDefault();
        alert("Your complain added successfully");
        const formData = new FormData();
        formData.append('file', inputFile);
        formData.append('userId', _id);
        formData.append('userName', userName);
        formData.append('userEmail', userEmail);
        formData.append('complainTitle', inputValue.complainTitle);
        formData.append('division', inputValue.division);
        formData.append('district', inputValue.district);
        formData.append('thana', inputValue.thana);
        formData.append('union', inputValue.union);
        formData.append('word', inputValue.word);
        formData.append('village', inputValue.village);
        formData.append('seeComplain', inputValue.seeComplain);
        formData.append('identity', inputValue.identity);
        formData.append('description', inputValue.description);

        //store date

        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        let todayData = new Date();
        let numberOfMonth = String(todayData.getMonth() + 1).padStart(2, '0');

        const currentTime = new Date().toLocaleTimeString();
        const day = String(todayData.getDate()).padStart(2, '0');
        const weekDay = weekDays[todayData.getDay()];
        let month = '';
        for(let i=0; i<12; i++){
            if(i==numberOfMonth){
                month = monthArray[i-1];
                break;
            }
        }

        const year = new Date().getFullYear();
        formData.append('createdTime', currentTime);
        formData.append('day', day);
        formData.append('weekDay', weekDay);
        formData.append('month', month);
        formData.append('year', year);

        fetch('https://whispering-mountain-24832.herokuapp.com/addComplain', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                console.log("complain added");
            }
        })
        .catch( (err) => {
            console.error(err);
        });
    }

    return (
        <section className='complainBox-section'>
            <div className='complainBoxCreateButton'>
                <div className='complainBoxContent'>
                    <div className='textArea'>
                        <p>Feel free to drop your complaint. <br /> We are committed to solving your problem as soon as possible</p>
                    </div>
                    <div>
                        <div className='complainBox-displayButton'>
                            {
                                loggedInUser?.userStatus!=='user'?
                                <button disabled onClick={handleOpen}>
                                    Create Your Own Complain
                                    <AddCircleOutlineIcon style={{marginLeft: "15px"}} />
                                </button>
                                :
                                <button onClick={handleOpen}>
                                    Create Your Own Complain
                                    <AddCircleOutlineIcon style={{marginLeft: "15px"}} />
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div className='complainBoxOverlyColor'></div>
            </div>
            <div className='modalArea'>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h2 id="parent-modal-title">Drop Your Complain</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='complainBox-formInputDiv'>
                                <TextField onBlur={handleBlur} name="complainTitle" id="standard-basic" label="Complain Title" variant="standard" fullWidth required/>
                            </div>
                            <div className='complainBox-gridInputDiv'>
                                <div className='complainBox-formInputDiv complainBox-fieldGap'>
                                    <TextField onBlur={handleBlur} name="division" id="standard-basic" label="Division" variant="standard" fullWidth required/>
                                </div>
                                <div className='complainBox-formInputDiv complainBox-fieldGap'>
                                    <TextField onBlur={handleBlur} name="district" id="standard-basic" label="District" variant="standard" fullWidth required/>
                                </div>
                                <div className='complainBox-formInputDiv'>
                                    <TextField onBlur={handleBlur} name="thana" id="standard-basic" label="Upozila/Thana" variant="standard" fullWidth required/>
                                </div>
                            </div>
                            <div className='complainBox-gridInputDiv'>
                                <div className='complainBox-formInputDiv complainBox-fieldGap'>
                                    <TextField onBlur={handleBlur} name="union" id="standard-basic" label="Union" variant="standard" fullWidth required/>
                                </div>
                                <div className='complainBox-formInputDiv complainBox-fieldGap'>
                                    <TextField onBlur={handleBlur} name="word" id="standard-basic" label="Word No." variant="standard" fullWidth required/>
                                </div>
                                <div className='complainBox-formInputDiv'>
                                    <TextField onBlur={handleBlur} name="village" id="standard-basic" label="Village" variant="standard" fullWidth required/>
                                </div>
                            </div>
                            <div className='complainBox-formInputDiv'>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Choose Who See Your Complain</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="seeComplain"
                                        label="Choose Who See Your Complain"
                                        onBlur={handleBlur}
                                        required
                                    >
                                        <MenuItem value="Magistrate">Magistrate</MenuItem>
                                        <MenuItem value="Mayor">Mayor</MenuItem>
                                        <MenuItem value="UNO">UNO</MenuItem>
                                        <MenuItem value="Union Chairman">Union Chairman</MenuItem>
                                        <MenuItem value="Word Member">Word Member</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl style={{"display": "flex", "flexDirection": "row","alignItems": "center", "justifyContent": "center"}}>
                                    <FormLabel id="demo-row-radio-buttons-group-label"> Desire To Show Your Own Identity? <span style={{"paddingRight": "10px"}}></span> </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        defaultValue="yes"
                                        name="identity"
                                        onBlur={handleBlur}
                                        required
                                    >
                                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className='complainBox-formInputDiv '>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Describe Your Complain"
                                    multiline
                                    rows={2}
                                    fullWidth
                                    name="description"
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            <div className='complainBox-fileUpload'>
                                <Button variant="contained" component="label" fullWidth>
                                    Upload Image - 
                                    <input name="image" onChange={handleChange} type="file" hidden required/>
                                    <small>{inputFile?.name}</small>
                                </Button>
                            </div>
                            <div className='complainBox-submit'>
                                {
                                    (inputFile?.name) &&
                                    <button className='modalButton'>Send</button> 
                                }
                                <button onClick={handleClose} variant="outlined">Close</button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>
        </section>
    );
};

export default ComplainBox;