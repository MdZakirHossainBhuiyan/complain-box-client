import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DisplayComplainCard from '../DisplayComplainCard/DisplayComplainCard';
import './DisplayComplains.css';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const DisplayComplains = () => {
    const [complains, setComplains] = useState(null);
    const [sliceComplains, setSliceComplains] = useState(null);
    const [loader, setLoader] = useState(false);
    let [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const fetchComplainsData = async () => {
            setLoader(true);

            const res = await fetch('https://whispering-mountain-24832.herokuapp.com/comlains');
            const data = await res.json();

            const startingIndex = (pageNumber*6)-6;
            const endingIndex = pageNumber*6;
            let response = data.slice(startingIndex, endingIndex);
            setSliceComplains(response);
            setComplains(data);

            setLoader(false);
        }

        fetchComplainsData();
    },[])

    useEffect(() => {
        const startingIndex = (pageNumber*6)-6;
        const endingIndex = pageNumber*6;
        let response;
        (complains!==null) && (response = complains.slice(startingIndex, endingIndex));
        setSliceComplains(response);

    }, [pageNumber]);

    const handleLeftButton = () => {
        setPageNumber(pageNumber-1);
    }

    const handleRightButton = () => {
        setPageNumber(pageNumber+1);
    }

    return (
        <section className='displayComplain-section'>
            <div className='displayComplain-content'>
                {
                    (!loader)?sliceComplains?.map(complain => <DisplayComplainCard key={complain._id} complain={complain} />)
                    :
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                }
            </div>

            <div className='paginationButton'>
                {
                    (pageNumber>1) &&
                    <button onClick={handleLeftButton}><ArrowCircleLeftIcon style={{"fontSize": "45px"}} /></button>
                }
                {
                    (sliceComplains?.length===6 && complains?.length!==(pageNumber*6)) &&
                    <button onClick={handleRightButton}><ArrowCircleRightIcon style={{"fontSize": "45px"}} /></button>
                }

                <p>Page - {pageNumber}</p>
            </div>
        </section>
    );
};

export default DisplayComplains;