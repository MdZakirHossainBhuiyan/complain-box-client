import React from 'react';
import './Footer.css';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
    return (
        <section className='footer-section'>
            <div className='footer-div'>
                <CopyrightIcon style={{"fontSize": "18px", "marginRight": "10px"}} />
                <p> Copyright {(new Date()).getFullYear()} : All Rights Preserved Bangladesh Govt.</p>
            </div>
        </section>
    );
};

export default Footer;