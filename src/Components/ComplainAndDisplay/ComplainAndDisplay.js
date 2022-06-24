import React from 'react';
import Footer from '../Footer/Footer';
import ComplainBox from './ComplainBox/ComplainBox';
import DisplayComplains from './DisplayComplains/DisplayComplains';
import Header from './Header/Header';

const ComplainAndDisplay = () => {
    return (
        <div>
            <Header />
            <ComplainBox />
            <DisplayComplains />
            <Footer />
        </div>
    );
};

export default ComplainAndDisplay;