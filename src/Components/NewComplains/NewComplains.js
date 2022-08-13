import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './NewComplains.css';
import NewComplainsCard from './NewComplainsCard/NewComplainsCard';

const NewComplains = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newComplains, setNewComplains] = useState(null);
    const [staffComplains, setStaffComplains] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchNewComplainsData = async () => {
            setLoader(true);

            const res = await fetch('http://localhost:5000/comlains');
            const data = await res.json();
            setNewComplains(data.filter(item => item.status==="pending"));
            setStaffComplains(data.filter(item2 => item2.seeComplain===loggedInUser.userStatus));

            setLoader(false);
        }

        fetchNewComplainsData();
    }, [])

    console.log('staff complain', staffComplains)

    return (
        <section className='newComplain-section'>
            <div className='newComplain-header'>
                {
                    (loggedInUser?.userStatus==='admin') && <h1>New Complains</h1>
                }
                {
                    (loggedInUser?.userStatus!=='admin' && loggedInUser?.userStatus!=='user') && <h1>Your Complains</h1>
                }
            </div>
            {
                (loader)?<CircularProgress />:
                <div className='newComplain-content'>
                    {
                        (newComplains?.length!==0 && !loader)?newComplains?.map(newComplain => <NewComplainsCard newComplain={newComplain} />):<p style={{"marginTop": "50px"}}>You have no Complain</p>
                    }
                </div>
            }
        </section>
    );
};

export default NewComplains;