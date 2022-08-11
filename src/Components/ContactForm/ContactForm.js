import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import './ContactForm.css';
import contactImage from '../../image/contact.png';
import thankYouImage from '../../image/thankyou.jpg';

const ContactForm = () => {
    const [inputValue, setInputValue] = useState(null);
    const [displayForm, setDisplayForm] = useState(true);

    const handleBlur = (e) => {
        const newValue = {...inputValue};
        newValue[e.target.name] = e.target.value;
        setInputValue(newValue);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Successfully sended your query");
        const formData = new FormData();
        formData.append('userName', inputValue.userName);
        formData.append('userEmail', inputValue.userEmail);
        formData.append('subject', inputValue.subject);
        formData.append('mailBody', inputValue.mailBody);

        fetch('http://localhost:5000/addContact', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('query add successfully.');
            setDisplayForm(false);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return (
        <section className='contactForm-section'>
            <div className='contactForm-header'>
                <h5>For Any Query Contact with Us</h5>
            </div>
            <div className='contactForm-form'>
                {
                    (displayForm)?
                    <form onSubmit={handleSubmit}>
                        <div className='contactForm-formInputDiv'>
                            <TextField onBlur={handleBlur} name="userName" id="standard-basic" label="Full Name" variant="standard" fullWidth />
                        </div>
                        <div className='contactForm-formInputDiv'>
                            <TextField onBlur={handleBlur} name="userEmail" id="standard-basic" label="Email" variant="standard" fullWidth />
                        </div>
                        <div className='contactForm-formInputDiv'>
                            <TextField onBlur={handleBlur} name="subject" id="standard-basic" label="Subject" variant="standard" fullWidth />
                        </div>
                        <br />
                        <div className='contactForm-formInputDiv '>
                            <TextField
                                id="outlined-multiline-static"
                                label="Write Here..."
                                multiline
                                rows={4}
                                fullWidth
                                name="mailBody"
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className='contactForm-submit'>
                            <button>Send</button>
                        </div>
                    </form>
                    :
                    <div>
                        <img src={thankYouImage} alt="contact image" />
                    </div>
                }
                <div className='contactForm-img'>
                    <img src={contactImage} alt="contact image" />
                </div>
            </div>
        </section>
    );
};

export default ContactForm;