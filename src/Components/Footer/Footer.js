import React from 'react';
import './Footer.css';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import DuoIcon from '@mui/icons-material/Duo';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';

const Footer = () => {
    return (
        <section className='footer-section'>
            <div className='footerContentArea'>
                <div className='socialLink'>
                    <h3>Complain Box</h3>
                    <p>Social</p>
                    <div className='socialIcon'>
                        <FacebookOutlinedIcon style={{paddingRight: "7px"}} />
                        <GitHubIcon style={{paddingRight: "7px"}} />
                        <SmartDisplayIcon style={{paddingRight: "7px"}} />
                        <DuoIcon style={{paddingRight: "7px"}} />
                        <MapsUgcIcon style={{paddingRight: "7px"}} />
                    </div>
                </div>
                <div className='companyInfo'>
                    <h3>Company</h3>
                    <p>About Us</p>
                    <p>feedback</p>
                    <p>Blog</p>
                </div>
                <div className='companyInfo'>
                    <h3>Resources</h3>
                    <p>About Us</p>
                    <p>feedback</p>
                    <p>Blog</p>
                </div>
                <div className='companyInfo'>
                    <h3>Help &#38; Support</h3>
                    <p>Contact Us</p>
                    <p>Knowledge Center</p>
                    <p>Custom Development</p>
                    <p>Sponsorship</p>
                </div>
                <div className='companyInfo'>
                    <h3>Legal</h3>
                    <p>Terms &#38; Condition</p>
                    <p>Privacy</p>
                    <p>Cookies</p>
                </div>
            </div>
            <div className='footer-div'>
                <p> Copyright &copy; {(new Date()).getFullYear()} : All Rights Preserved Bangladesh Govt.</p>
            </div>
        </section>
    );
};

export default Footer;