import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import ComplainBox from './ComplainBox/ComplainBox';
import DisplayComplains from './DisplayComplains/DisplayComplains';
import Header from './Header/Header';
import './ComplainAndDisplay.css';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ClockComponent from './ClockComponent/ClockComponent';

const ComplainAndDisplay = () => {
    const [weekDay, setWeekDay] = useState(null);
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);

    useEffect(() => {
        const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        let today = new Date();
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        
        setDay(String(today.getDate()).padStart(2, '0'));
        setWeekDay(dayArray[today.getDay()]);
    
        for(let i=0; i<12; i++){
            if(i==mm){
                setMonth(monthArray[i-1]);
                break;
            }
        }
    }, [])

    return (
        <section className='complainBoxBody'>
            <div className='headerComponent'>
                <Header />
            </div>

            <div className='timerBox'>
                <ClockComponent />
                <div className='weekDayArea'>
                    <p>{weekDay}</p>
                </div>
                <div className='dateArea'>
                    <p>{month} {day}, {new Date().getFullYear()}</p>
                    <div className='iconStyleDate'>
                        <DateRangeOutlinedIcon
                            style={{
                                width: "40px",
                                height: "40px",
                                color: "#fff"
                            }}
                        />
                    </div>
                </div>
            </div>
            
            <ComplainBox />
            <div className='complainsList'>
                <DisplayComplains />
            </div>
            <Footer />
        </section>
    );
};

export default ComplainAndDisplay;