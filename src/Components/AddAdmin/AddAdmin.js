import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import '../AddStaff/AddStaff.css';

const AddAdmin = () => {
    const [inputValue, setInputValue] = useState(null);

    const handleChange = (e) => {
        const newValue = {...inputValue};
        newValue[e.target.name] = e.target.value;
        setInputValue(newValue);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("New Admin Data Added");
        const formData = new FormData();
        formData.append('userName', inputValue.name);
        formData.append('userEmail', inputValue.email);
        formData.append('userPhone', inputValue.phone);
        formData.append('userPassword', inputValue.password);
        formData.append('userAddress', inputValue.address);
        formData.append('userStatus', inputValue.status);

        fetch('http://localhost:5000/addAdmin', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Admin add success.');
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return (
        <section className='addStaff-section'>
            <div className='addStaff-header'>
                <h5>Add New Admin</h5>
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
                    
                    <div className='addStaff-submit'>
                        <button>Add Staff</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddAdmin;