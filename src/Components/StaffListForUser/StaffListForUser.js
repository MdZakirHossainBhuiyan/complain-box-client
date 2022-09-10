import React from 'react';
import Header from '../ComplainAndDisplay/Header/Header';
import Footer from '../Footer/Footer';
import StaffListTable from './StaffListTable';
import './StaffListForUser.css';

const StaffListForUser = () => {
    return (
        <section>
            <Header />
            <div className='staffListTableArea'>
                <StaffListTable />
            </div>
            <Footer />
        </section>
    );
};

export default StaffListForUser;