import React from 'react';
import Header from '../ComplainAndDisplay/Header/Header';
import Footer from '../Footer/Footer';
import ContactForm from './ContactForm';

const ContactFormMain = () => {
    return (
        <section>
            <Header />
            <ContactForm />
            <Footer />
        </section>
    );
};

export default ContactFormMain;