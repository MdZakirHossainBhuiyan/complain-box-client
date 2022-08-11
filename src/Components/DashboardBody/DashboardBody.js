import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import AddAdmin from '../AddAdmin/AddAdmin';
import AddEmergencyContact from '../AddEmergencyContact/AddEmergencyContact';
import AddStaff from '../AddStaff/AddStaff';
import DisplayComplainCard from '../ComplainAndDisplay/DisplayComplainCard/DisplayComplainCard';
import DisplayComplains from '../ComplainAndDisplay/DisplayComplains/DisplayComplains';
import Lists from '../Lists/Lists';
import NewComplains from '../NewComplains/NewComplains';
import UserQuery from '../UserQuery/UserQuery';
import './DashboardBody.css';


const DashboardBody = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [displayStaffForm, setDisplayStaffForm] = useState(false);
    const [displayNewComplain, setDisplayNewComplain] = useState(true);
    const [displayAllComplain, setDisplayAllComplain] = useState(false);
    const [displayAdminForm, setDisplayAdminForm] = useState(false);
    const [displayStaffAdmin, setDisplayStaffAdmin] = useState(false);
    const [displayEmergencyContactForm, setDisplayEmergencyContactForm] = useState(false);
    const [displayQuery, setDisplayUserQuery] = useState(false);
    const [userComplain, setUserComplain] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchComplainsData = async () => {
            setLoader(true);

            const res = await fetch('http://localhost:5000/comlains');
            const data = await res.json();
            setUserComplain(data.filter(item => item.userEmail===loggedInUser.userEmail));

            setLoader(false);
        }

        fetchComplainsData();
    }, [loggedInUser.userEmail])

    const handleAddStaff = () => {
        (displayStaffForm)?setDisplayStaffForm(false):setDisplayStaffForm(true);
        setDisplayNewComplain(false);
        setDisplayAllComplain(false);
        setDisplayAdminForm(false);
        setDisplayStaffAdmin(false);
        setDisplayEmergencyContactForm(false);
        setDisplayUserQuery(false);
    }

    const handleAddAdmin = () => {
        (displayAdminForm)?setDisplayAdminForm(false):setDisplayAdminForm(true);
        setDisplayNewComplain(false);
        setDisplayAllComplain(false);
        setDisplayStaffForm(false);
        setDisplayStaffAdmin(false)
        setDisplayEmergencyContactForm(false);
        setDisplayUserQuery(false);
    }

    const handleNewComplain = () => {
        (displayNewComplain)?setDisplayNewComplain(false):setDisplayNewComplain(true);
        setDisplayStaffForm(false);
        setDisplayAllComplain(false);
        setDisplayAdminForm(false);
        setDisplayStaffAdmin(false)
        setDisplayEmergencyContactForm(false);
        setDisplayUserQuery(false);
    }

    const handleAllComplain = () => {
        (displayAllComplain)?setDisplayAllComplain(false):setDisplayAllComplain(true);
        setDisplayNewComplain(false);
        setDisplayAdminForm(false);
        setDisplayStaffForm(false);
        setDisplayStaffAdmin(false);
        setDisplayEmergencyContactForm(false);
        setDisplayUserQuery(false);
    }

    const handleStaffAdmin = () => {
        (displayStaffAdmin)?setDisplayStaffAdmin(false):setDisplayStaffAdmin(true);
        setDisplayNewComplain(false);
        setDisplayAdminForm(false);
        setDisplayStaffForm(false);
        setDisplayAllComplain(false);
        setDisplayEmergencyContactForm(false);
        setDisplayUserQuery(false);
    }

    const handleAddEmergencyContact = () => {
        (displayEmergencyContactForm)?setDisplayEmergencyContactForm(false):setDisplayEmergencyContactForm(true);
        setDisplayNewComplain(false);
        setDisplayAdminForm(false);
        setDisplayStaffForm(false);
        setDisplayAllComplain(false);
        setDisplayStaffAdmin(false);
        setDisplayUserQuery(false);
    }

    const handleUserQuery = () => {
        (displayQuery)?setDisplayUserQuery(false):setDisplayUserQuery(true);
        setDisplayNewComplain(false);
        setDisplayAdminForm(false);
        setDisplayStaffForm(false);
        setDisplayAllComplain(false);
        setDisplayStaffAdmin(false);
        setDisplayEmergencyContactForm(false);
    }

    return (
        <div className='dashboardBody-mainDiv'>
            {
                (loggedInUser.userStatus!=='user')?
                <div className='dashboardBody-navBar'>
                    <button className={displayNewComplain && "activeButton"} onClick={handleNewComplain}>New Complains</button>

                    <button className={displayAllComplain && "activeButton"} onClick={handleAllComplain}>All Complains</button>

                    <button className={displayStaffAdmin && "activeButton"} onClick={handleStaffAdmin}>Staff/Admin list</button>

                    {
                        (loggedInUser.userStatus==='admin') &&
                        <button className={displayStaffForm && "activeButton"} onClick={handleAddStaff}>Add Staff</button>
                    }

                    {
                        (loggedInUser.userStatus==='admin') &&
                        <button className={displayAdminForm && "activeButton"} onClick={handleAddAdmin}>Add Admin</button>
                    }
                    {
                        (loggedInUser.userStatus==='admin') &&
                        <button className={displayEmergencyContactForm && "activeButton"} onClick={handleAddEmergencyContact}>Add Emergency Contact</button>
                    }
                    {
                        (loggedInUser.userStatus==='admin') &&
                        <button className={displayQuery && "activeButton"} onClick={handleUserQuery}>User Query</button>
                    }
                </div>
                :
                <div className='userDashBoard-contentBody'>
                    <div className='userDashBoard-contentHeader'>
                        <h5>Your Complains List</h5>
                    </div>
                    {
                        (!loader)?
                        <div className="userComplain-cardBody">
                        {
                            userComplain?.map(complain => <DisplayComplainCard key={complain._id} complain={complain} />)
                        }
                        </div>
                        :
                        <CircularProgress />
                    }
                    {
                        (!loader) && (userComplain?.length===0) && <p>You have no complains</p>
                    }
                </div>
            }
            <div className='dashboardBody-content'>
                {(loggedInUser.userStatus!=="user" && displayNewComplain) && <NewComplains />}
                {displayStaffForm && <AddStaff />}
                {displayAdminForm && <AddAdmin />}
                {displayAllComplain && <DisplayComplains />}
                {displayStaffAdmin && <Lists />}
                {displayEmergencyContactForm && <AddEmergencyContact />}
                {displayQuery && <UserQuery />}
            </div>
        </div>
    );
};

export default DashboardBody;