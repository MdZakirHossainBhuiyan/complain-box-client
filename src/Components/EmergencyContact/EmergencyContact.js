import React from 'react';
import Header from '../ComplainAndDisplay/Header/Header';
import Footer from '../Footer/Footer';
import EmergencyContactContent from './EmergencyContactContent';
import './EmergencyContact.css';

const EmergencyContact = () => {
    return (
        <section>
            <Header />
            <div className='emergencyContentArea'>
                <EmergencyContactContent />
            </div>
            <Footer />
        </section>
    );
};

export default EmergencyContact;