import React from 'react';
import Header from '../ComplainAndDisplay/Header/Header';
import Footer from '../Footer/Footer';
import ContactForm from './ContactForm';
import './ContactForm.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LanguageIcon from '@mui/icons-material/Language';

const ContactFormMain = () => {
    return (
        <section>
            <Header />
            <div className='contactFormArea'>
                <div className='contactFormHeading'>
                    <div className='headingLeftSide'>
                        <h3>Let's talk about everything</h3>
                    </div>
                    <hr className='divLine' />
                    <div className='headingRightSide'>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make</p>
                    </div>
                </div>
                <div className='contactFormItem'>
                    <div className='contactFormContent'>
                        <div className='contentIcon'>
                            <LocationOnIcon style={{"color": "#fff"}} />
                        </div>
                        <div className='contactFormInfo'>
                            <h3>Address: <span>Rampura, Dhaka, Bangladesh</span></h3>
                        </div>
                    </div>
                    <div className='contactFormContent'>
                        <div className='contentIcon'>
                            <CallIcon style={{"color": "#fff"}} />
                        </div>
                        <div className='contactFormInfo'>
                            <h3>Phone: <span>+880 1675-026895</span></h3>
                        </div>
                    </div>
                    <div className='contactFormContent'>
                        <div className='contentIcon'>
                            <MailOutlineIcon style={{"color": "#fff"}} />
                        </div>
                        <div className='contactFormInfo'>
                            <h3>Email: <span>zakirhossaintuhin@gmail.com</span></h3>
                        </div>
                    </div>
                    <div className='contactFormContent'>
                        <div className='contentIcon'>
                            <LanguageIcon style={{"color": "#fff"}} />
                        </div>
                        <div className='contactFormInfo'>
                            <h3>Website: <span>www.complainbox.com</span></h3>
                        </div>
                    </div>
                </div>
                <ContactForm />
            </div>
            <Footer />
        </section>
    );
};

export default ContactFormMain;