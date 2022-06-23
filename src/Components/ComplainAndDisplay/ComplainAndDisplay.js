import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ComplainBox from './ComplainBox/ComplainBox';
import DisplayComplains from './DisplayComplains/DisplayComplains';
import Header from './Header/Header';

const ComplainAndDisplay = () => {
    const {state} = useLocation();

    return (
        <div>
            <Header state={state} />
            <ComplainBox state={state} />
            <DisplayComplains />
            <Footer />
        </div>
    );
};

export default ComplainAndDisplay;