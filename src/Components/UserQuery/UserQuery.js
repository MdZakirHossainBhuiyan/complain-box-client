import React, { useEffect, useState } from 'react';
import './UserQuery.css';
import UserQueryCard from './UserQueryCard/UserQueryCard';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

const UserQuery = () => {
    const [activeReadButton, setActiveReadButton] = useState(false);
    const [activeUnreadButton, setActiveUnreadButton] = useState(true);
    const [readQuery, setReadQuery] = useState(null);
    const [unreadQuery, setUnreadQuery] = useState(null);
    const [loader, setLoader] = useState(false);

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
            const res = await fetch('https://complain-box-server.vercel.app/userQuery');
            const data = await res.json();
            setReadQuery(data.filter(item => item.readingStatus==="Read"));
            setUnreadQuery(data.filter(item => item.readingStatus==="Unread"));

            setLoader(false);
        }

        fetchUserQuery();
    },[])

    let totalMail = 0;
    let readMail = 0;
    let unreadMail = 0;

    if(readQuery && unreadQuery){
        readMail = readQuery?.length;
        unreadMail = unreadQuery?.length;
        totalMail = readMail + unreadMail;
    }

    return (
        <section className='userQuery-section'>
            <div className='userQuery-leftDiv'>
                <div className='countSection'>
                    <div className='countSectionTitle'>
                        <h4>Mails from our beloved citizens</h4>
                    </div>
                    <div className='countValueArea'>
                        <div className='countValueStyle total'>
                            <h5>Total: <span>{totalMail}</span></h5>
                        </div>
                        <div className='countValueStyle read'>
                            <h5>Read: <span>{readMail}</span></h5>
                        </div>
                        <div className='countValueStyle unread'>
                            <h5>Unread: <span>{unreadMail}</span></h5>
                        </div>
                    </div>
                </div>
                {
                    activeReadButton && readQuery?.map(query => <UserQueryCard query={query} />)
                }
                {
                    activeUnreadButton && unreadQuery?.map(query => <UserQueryCard query={query} />)
                }
            </div>
            <div className='userQuery-rightDiv'>
                <div className='queryTypeTitle'>
                    <h4>Query Type</h4>
                </div>
                <div className='typeSelectBtn'>
                    <div className='btnArea'>
                        <div className='buttonIcon'>
                            <MarkEmailUnreadIcon style={{"color": "blue", "fontSize": "20px"}} />
                        </div>
                        <button onClick={handleUnread}>Unread</button>
                    </div>
                    <div className='btnArea'>
                        <div className='buttonIcon'>
                            <MarkEmailReadIcon style={{"color": "green", "fontSize": "20px"}} />
                        </div>
                        <button onClick={handleRead}>Read</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserQuery;