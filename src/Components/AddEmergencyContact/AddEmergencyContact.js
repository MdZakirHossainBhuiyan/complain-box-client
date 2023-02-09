import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import '../AddStaff/AddStaff.css';

const AddEmergencyContact = () => {
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
        alert("New Emergency Contact Data Added");
        const formData = new FormData();
        formData.append('location', inputValue.location);
        formData.append('police', inputValue.police);
        formData.append('fire', inputValue.fire);
        formData.append('hospital', inputValue.hospital);

        fetch('https://complain-box-server.vercel.app/addEmergencyContact', {
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
                    <button onClick={handleDisplayButton}>Add More Contact Info</button>
                </div>
            }
            {
                (!displayButton) && <div className='addStaff-body'>
                    <div className='addStaff-header'>
                        <h5>Add New Emergency Contact</h5>
                    </div>
                    <div className='addStaff-form'>
                        <form onSubmit={handleSubmit}>
                            <div className='complainBox-formInputDiv'>
                                <TextField onChange={handleChange} name="location" id="standard-basic" label="Location" variant="standard" fullWidth required />
                            </div>
                            <div className='complainBox-gridInputDiv'>
                                <div className='complainBox-formInputDiv complainBox-fieldGap'>
                                    <TextField onChange={handleChange} name="police" id="standard-basic" label="Police Station" variant="standard" fullWidth required />
                                </div>
                                <div className='complainBox-formInputDiv complainBox-fieldGap'>
                                    <TextField onChange={handleChange} name="fire" id="standard-basic" label="Fire Station" variant="standard" fullWidth required />
                                </div>
                                <div className='complainBox-formInputDiv'>
                                    <TextField onChange={handleChange} name="hospital" id="standard-basic" label="Hospital" variant="standard" fullWidth required />
                                </div>
                            </div>
                            
                            <div className='addStaff-submit'>
                                <button>Add Emergency Contact</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </section>
    );
};

export default AddEmergencyContact;