import React, { useEffect, useState } from 'react';
import DisplayComplainCard from '../DisplayComplainCard/DisplayComplainCard';
import './DisplayComplains.css';

const DisplayComplains = () => {
    const [complains, setComplains] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/comlains')
        .then(res => res.json())
        .then(data => setComplains(data))
    }, [])

    return (
        <section className='displayComplain-section'>
            <div className='displayComplain-header'>
                <h5>Latest Complains</h5>
            </div>
            <div className='displayComplain-content'>
                {
                    complains?.map(complain => <DisplayComplainCard complain={complain} />)
                }
            </div>
        </section>
    );
};

export default DisplayComplains;