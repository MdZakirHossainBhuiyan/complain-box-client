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

const ComplainBox = ({state}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {_id, userName, userEmail} = loggedInUser;
    const [isDisplay, setIsDisplay] = useState(false);
    const [inputValue, setInputValue] = useState(null);
    const [inputFile, setInputFile] = useState(null);

    const handleDisplay = () => {
        (isDisplay)?setIsDisplay(false):setIsDisplay(true);
    }

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

        setIsDisplay(false);
    }

    return (
        <section className='complainBox-section'>
            {
                (loggedInUser.userStatus==="user") && <div className='complainBox-displayButton'>
                    <button onClick={handleDisplay}>
                        {
                            isDisplay?"Hide Complain Box":"Create Your Own Complain"
                        }
                    </button>
                </div>
            }
            {
                isDisplay && 
                <div className='complainBox-form'>
                    <div className='complainBox-header'>
                        <h5>Drop Your Complain</h5>
                    </div>
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
                        <br />
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
                        <br />
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
                        <br />
                        <div className='complainBox-formInputDiv '>
                            <TextField
                                id="outlined-multiline-static"
                                label="Describe Your Complain"
                                multiline
                                rows={4}
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
                                <button>Send</button> 
                            }
                        </div>
                    </form>
                </div>
            }
            
        </section>
    );
};

export default ComplainBox;