import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './NewComplains.css';
import NewComplainsCard from './NewComplainsCard/NewComplainsCard';

const NewComplains = () => {
    const [newComplains, setNewComplains] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchNewComplainsData = async () => {
            setLoader(true);

            const res = await fetch('http://localhost:5000/comlains');
            const data = await res.json();
            setNewComplains(data.filter(item => item.status==="pending"));

            setLoader(false);
        }

        fetchNewComplainsData();
    }, [])

    return (
        <section className='newComplain-section'>
            <div className='newComplain-header'>
                <h1>New Complains</h1>
            </div>
            <div className='newComplain-content'>
                {
                    (!loader)?newComplains?.map(newComplain => <NewComplainsCard newComplain={newComplain} />):<CircularProgress />
                }
            </div>
        </section>
    );
};

export default NewComplains;