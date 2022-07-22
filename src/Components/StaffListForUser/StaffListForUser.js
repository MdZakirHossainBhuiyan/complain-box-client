import React from 'react';
import Header from '../ComplainAndDisplay/Header/Header';
import Footer from '../Footer/Footer';
import StaffListTable from './StaffListTable';

const StaffListForUser = () => {
    return (
        <section>
            <Header />
            <StaffListTable />
            <Footer />
        </section>
    );
};

export default StaffListForUser;