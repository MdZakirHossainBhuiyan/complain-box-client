import React from 'react';
import { Link } from 'react-router-dom';
import './IdentityOption.css';

const IdentityOption = () => {
    return (
        <section className='identityOption-section'>
            <div className='identityOption-title'>
                <p>Desire To Show Your Own Identity?</p>
            </div>
            <div className='identityOption-buttons'>
                <Link to="/userSignIn"><button className='identityOption-yesButton'>Yes</button></Link>
                <Link to="/home"><button className='identityOption-noButton'>No</button></Link>
            </div>
        </section>
    );
};

export default IdentityOption;