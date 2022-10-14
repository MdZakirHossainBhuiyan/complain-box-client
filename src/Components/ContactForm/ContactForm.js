import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import './ContactForm.css';
import contactImage from '../../image/contact.png';
import thankYouImage from '../../image/thankyou.jpg';
import SendIcon from '@mui/icons-material/Send';

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

        fetch('https://whispering-mountain-24832.herokuapp.com/addContact', {
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
        <section className='contactFormSection'>
            <div className='contactForm'>
                {
                    (displayForm)?
                    <form className='formBody' onSubmit={handleSubmit}>
                        <div className='contactForm-formInputDiv'>
                            <TextField onBlur={handleBlur} name="userName" id="standard-basic" label="Full Name" variant="standard" fullWidth required />
                        </div>
                        <div className='contactForm-formInputDiv'>
                            <TextField onBlur={handleBlur} name="userEmail" id="standard-basic" label="Email" variant="standard" fullWidth required />
                        </div>
                        <div className='contactForm-formInputDiv'>
                            <TextField onBlur={handleBlur} name="subject" id="standard-basic" label="Subject" variant="standard" fullWidth required />
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
                                required
                            />
                        </div>
                        <div className='contactForm-submit'>
                            <button>Send <SendIcon style={{"transform": "rotate(-45deg)"}} /></button>
                        </div>
                    </form>
                    :
                    <div className='thankYouMsg'>
                        <img src={thankYouImage} alt="contact image" />
                    </div>
                }
            </div>
            <div className='formMap'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d17369.23463462194!2d90.41937734339733!3d23.76763388390523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1662788474339!5m2!1sen!2sbd"></iframe>
            </div>
        </section>
    );
};

export default ContactForm;