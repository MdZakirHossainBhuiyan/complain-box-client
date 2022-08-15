import React, { useEffect, useState } from 'react';
import './UserQuery.css';
import UserQueryCard from './UserQueryCard/UserQueryCard';

const UserQuery = () => {
    const [activeReadButton, setActiveReadButton] = useState(false);
    const [activeUnreadButton, setActiveUnreadButton] = useState(true);
    const [readQuery, setReadQuery] = useState(null);
    const [unreadQuery, setUnreadQuery] = useState(null);
    const [loader, setLoader] = useState(false);

    console.log('read', readQuery);
    console.log('unread', unreadQuery);

    const handleRead = () => {
        (activeReadButton)?setActiveReadButton(false):setActiveReadButton(true);
        setActiveUnreadButton(false);
    }

    const handleUnread = () => {
        (activeUnreadButton)?setActiveUnreadButton(false):setActiveUnreadButton(true);
        setActiveReadButton(false);
    }

    useEffect(() => {
        const fetchUserQuery = async () => {
            setLoader(true);
            const res = await fetch('https://whispering-mountain-24832.herokuapp.com/userQuery');
            const data = await res.json();
            setReadQuery(data.filter(item => item.readingStatus==="Read"));
            setUnreadQuery(data.filter(item => item.readingStatus==="Unread"));

            setLoader(false);
        }

        fetchUserQuery();
    },[])

    return (
        <section className='userQuery-section'>
            <div className='userQuery-leftDiv'>
                {
                    activeReadButton && readQuery?.map(query => <UserQueryCard query={query} />)
                }
                {
                    activeUnreadButton && unreadQuery?.map(query => <UserQueryCard query={query} />)
                }
            </div>
            <div className='userQuery-rightDiv'>
                <h4>Query Type</h4>
                <ul>
                    <li><button onClick={handleUnread}>Unread</button></li>
                    <li><button onClick={handleRead}>Read</button></li>
                </ul>
            </div>
        </section>
    );
};

export default UserQuery;