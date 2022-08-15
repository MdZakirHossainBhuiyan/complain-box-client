import React, { useEffect, useState } from 'react';
import AdminList from './AdminList/AdminList';
import StaffLists from './StaffLists/StaffLists';
import './List.css';

const Lists = () => {
    const [adminData, setAdminData] = useState(null);
    const [staffData, setStaffData] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoader(true);
            const res = await fetch('https://whispering-mountain-24832.herokuapp.com/userData');
            const data = await res.json();
            setAdminData(data.filter(item => item.userStatus==="admin"));
            setStaffData(data.filter(item => (item.userStatus!=="user" && item.userStatus!=="admin")));

            setLoader(false);
        }

        fetchUserData();
    },[])

    return (
        <section className='list-section'>
            <AdminList adminData={adminData} loader={loader}/>
            <StaffLists staffData={staffData} loader={loader}/>
        </section>
    );
};

export default Lists;