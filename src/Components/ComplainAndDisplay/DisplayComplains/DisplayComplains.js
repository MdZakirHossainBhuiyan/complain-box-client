import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DisplayComplainCard from '../DisplayComplainCard/DisplayComplainCard';
import './DisplayComplains.css';

const DisplayComplains = () => {
    const [complains, setComplains] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchComplainsData = async () => {
            setLoader(true);

            const res = await fetch('http://localhost:5000/comlains');
            const data = await res.json();
            setComplains(data);

            setLoader(false);
        }

        fetchComplainsData();
    }, [])

    return (
        <section className='displayComplain-section'>
            <div className='displayComplain-header'>
                <h5>Latest Complains</h5>
            </div>
            <div className='displayComplain-content'>
                {
                    (!loader)?complains?.map(complain => <DisplayComplainCard key={complain._id} complain={complain} />)
                    :
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                }
            </div>
        </section>
    );
};

export default DisplayComplains;