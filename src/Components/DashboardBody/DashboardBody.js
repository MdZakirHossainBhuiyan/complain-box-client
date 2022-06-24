import React, { useState } from 'react';
import AddAdmin from '../AddAdmin/AddAdmin';
import AddStaff from '../AddStaff/AddStaff';
import DisplayComplains from '../ComplainAndDisplay/DisplayComplains/DisplayComplains';
import './DashboardBody.css';


const DashboardBody = () => {
    const [displayStaffForm, setDisplayStaffForm] = useState(false);
    const [displayNewComplain, setDisplayNewComplain] = useState(false);
    const [displayAllComplain, setDisplayAllComplain] = useState(false);
    const [displayAdminForm, setDisplayAdminForm] = useState(false);

    const handleAddStaff = () => {
        (displayStaffForm)?setDisplayStaffForm(false):setDisplayStaffForm(true);
        setDisplayNewComplain(false);
        setDisplayAllComplain(false);
        setDisplayAdminForm(false);
    }

    const handleAddAdmin = () => {
        (displayAdminForm)?setDisplayAdminForm(false):setDisplayAdminForm(true);
        setDisplayNewComplain(false);
        setDisplayAllComplain(false);
        setDisplayStaffForm(false);
    }

    const handleNewComplain = () => {
        (displayNewComplain)?setDisplayNewComplain(false):setDisplayNewComplain(true);
        setDisplayStaffForm(false);
        setDisplayAllComplain(false);
        setDisplayAdminForm(false);
    }

    const handleAllComplain = () => {
        (displayAllComplain)?setDisplayAllComplain(false):setDisplayAllComplain(true);
        setDisplayNewComplain(false);
        setDisplayAdminForm(false);
        setDisplayStaffForm(false);
    }

    return (
        <div className='dashboardBody-mainDiv'>
            <div className='dashboardBody-navBar'>
                <button onClick={handleNewComplain}>New Complains</button>
                <button onClick={handleAllComplain}>All Complains</button>
                <button onClick={handleAddStaff}>Add Staff</button>
                <button onClick={handleAddAdmin}>Add Admin</button>
            </div>
            <div className='dashboardBody-content'>
                {displayStaffForm && <AddStaff />}
                {displayAdminForm && <AddAdmin />}
                {displayAllComplain && <DisplayComplains />}
            </div>
        </div>
    );
};

export default DashboardBody;