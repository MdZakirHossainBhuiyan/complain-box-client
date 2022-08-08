import React, { useState } from 'react';
import './AddStaff.css';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const AddStaff = () => {
    const [inputValue, setInputValue] = useState(null);
    const [displayButton, setDisplayButton] = useState(false);

    const handleDisplayButton = () => {
        setDisplayButton(false);
    }

    const handleChange = (e) => {
        const newValue = {...inputValue};
        newValue[e.target.name] = e.target.value;
        setInputValue(newValue);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("One Staff Data Added");
        const formData = new FormData();
        formData.append('userName', inputValue.name);
        formData.append('userEmail', inputValue.email);
        formData.append('userPhone', inputValue.phone);
        formData.append('userPassword', inputValue.password);
        formData.append('userAddress', inputValue.address);
        formData.append('userStatus', inputValue.status);
        formData.append('division', inputValue.division);
        formData.append('district', inputValue.district);
        if(inputValue?.thana){
            formData.append('thana', inputValue?.thana);
        }
        if(inputValue?.union){
            formData.append('union', inputValue?.union);
        }
        if(inputValue?.word){
            formData.append('word', inputValue?.word);
        }

        fetch('http://localhost:5000/addStaff', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setDisplayButton(true);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return (
        <section className='addStaff-section'>
            {
                displayButton && <div className='addStaff-displayButton'>
                    <button onClick={handleDisplayButton}>Add More Staff</button>
                </div>
            }
            {
                (!displayButton) && <div className='addStaff-body'>
                    <div className='addStaff-header'>
                        <h5>Add New Staff</h5>
                    </div>
                    <div className='addStaff-form'>
                        <form onSubmit={handleSubmit}>
                            <div className='complainBox-gridInputDiv'>
                                <div className='complainBox-formInputDiv complainBox-fieldGap'>
                                    <TextField onChange={handleChange} name="name" id="standard-basic" label="Full Name" variant="standard" fullWidth />
                                </div>
                                <div className='complainBox-formInputDiv'>
                                    <TextField onChange={handleChange} name="email" id="standard-basic" label="Email" variant="standard" fullWidth />
                                </div>
                            </div>
                            <div className='complainBox-gridInputDiv'>
                                <div className='complainBox-formInputDiv complainBox-fieldGap'>
                                    <TextField onChange={handleChange} name="phone" id="standard-basic" label="Phone" variant="standard" fullWidth />
                                </div>
                                <div className='complainBox-formInputDiv'>
                                    <TextField onChange={handleChange} name="password" id="standard-basic" label="Password" variant="standard" fullWidth />
                                </div>
                            </div>
                            <div className='contactForm-formInputDiv'>
                                <TextField onChange={handleChange} name="address" id="standard-basic" label="Address" variant="standard" fullWidth />
                            </div>
                            <br />
                            <div className='complainBox-formInputDiv'>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Status of Staff</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="status"
                                        label="Status of Staff"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Magistrate">Magistrate</MenuItem>
                                        <MenuItem value="Mayor">Mayor</MenuItem>
                                        <MenuItem value="UNO">UNO</MenuItem>
                                        <MenuItem value="Union Chairman">Union Chairman</MenuItem>
                                        <MenuItem value="Word Member">Word Member</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            {
                                (inputValue?.status) && 
                                <div className='complainBox-formInputDiv'>
                                    <TextField onChange={handleChange} name="division" id="standard-basic" label="Division" variant="standard" fullWidth />
                                </div>
                            }

                            {
                                (inputValue?.status) &&
                                <div className='complainBox-formInputDiv'>
                                    <TextField onChange={handleChange} name="district" id="standard-basic" label="District" variant="standard" fullWidth />
                                </div>
                            }

                            {
                                (inputValue?.status==="UNO" || inputValue?.status==="Union Chairman" || inputValue?.status==="Word Member") &&
                                <div className='complainBox-formInputDiv'>
                                    <TextField onChange={handleChange} name="thana" id="standard-basic" label="Upozila/Thana" variant="standard" fullWidth />
                                </div>
                            }

                            {
                                (inputValue?.status==="Union Chairman" || inputValue?.status==="Word Member") &&
                                <div className='complainBox-formInputDiv'>
                                    <TextField onChange={handleChange} name="union" id="standard-basic" label="Union" variant="standard" fullWidth />
                                </div>
                            }

                            {
                                (inputValue?.status==="Word Member") &&
                                <div className='complainBox-formInputDiv'>
                                    <TextField onChange={handleChange} name="word" id="standard-basic" label="Word No." variant="standard" fullWidth />
                                </div>
                            }
                            
                            <div className='addStaff-submit'>
                                <button>Add Staff</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </section>
    );
};

export default AddStaff;