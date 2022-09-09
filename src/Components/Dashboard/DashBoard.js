import React from 'react';
import Header from '../ComplainAndDisplay/Header/Header';
import DashboardBody from '../DashboardBody/DashboardBody';
import Footer from '../Footer/Footer';
import './DashBoard.css';

const DashBoard = () => {
    return (
        <section>
            <Header />
            <DashboardBody />
            <Footer />
        </section>
    );
};

export default DashBoard;