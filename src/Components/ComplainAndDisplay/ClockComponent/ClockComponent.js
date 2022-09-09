import React, { useEffect, useState } from 'react';
import '../ComplainAndDisplay.css';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

const ClockComponent = () => {
    const [clockTime, setClockTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        setInterval(() => {
            const newTime = new Date().toLocaleTimeString();
            setClockTime(newTime);
        }, 1000)
    }, [])

    return (
        <div className='clockArea'>
            <div className='iconStyleClock'>
                <AccessAlarmOutlinedIcon
                    style={{
                        width: "40px",
                        height: "40px",
                        color: "#fff"
                    }}
                />
            </div>
            <p>{clockTime}</p>
        </div>
    );
};

export default ClockComponent;