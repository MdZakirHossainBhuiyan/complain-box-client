import React from 'react';
import Header from '../ComplainAndDisplay/Header/Header';
import DashboardBody from '../DashboardBody/DashboardBody';
import './DashBoard.css';

const DashBoard = () => {
    return (
        <section>
            <Header />
            <DashboardBody />
        </section>
    );
};

export default DashBoard;