import React from 'react';
import Header from '../ComplainAndDisplay/Header/Header';
import Footer from '../Footer/Footer';
import EmergencyContactContent from './EmergencyContactContent';

const EmergencyContact = () => {
    return (
        <section>
            <Header />
            <EmergencyContactContent />
            <Footer />
        </section>
    );
};

export default EmergencyContact;