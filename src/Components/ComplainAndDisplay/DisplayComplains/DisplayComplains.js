import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import DisplayComplainCard from '../DisplayComplainCard/DisplayComplainCard';
import './DisplayComplains.css';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { UserContext } from '../../../App';

const DisplayComplains = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [complains, setComplains] = useState(null);
    const [sliceComplains, setSliceComplains] = useState(null);
    const [loader, setLoader] = useState(false);
    let [pageNumber, setPageNumber] = useState(1);
    const [input, setInput] = useState(null);

    const handleInput = (e) => {
        let preValue = {...input};
        preValue[e.target.name] = e.target.value;
        setInput(preValue);
    }

    const handleFilters = (e) => {
        e.preventDefault();
        const nameOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let flag = false;
        let filtersMonth = [];

        for(let i=0; i<12; i++){
            if(nameOfMonth[i]===input.monthFrom){
                flag = true;
            }
            if(flag){
                filtersMonth.push(nameOfMonth[i]);
            }
            if(nameOfMonth[i]===input.monthTo){
                flag = false;
            }
        }

        const filteredComplains = complains.filter(complain => complain.year===input.year && filtersMonth.includes(complain.month));
        setComplains(filteredComplains);
    }


    useEffect(() => {
        const fetchComplainsData = async () => {
            setLoader(true);

            const res = await fetch('https://complain-box-server.vercel.app/comlains');
            const data = await res.json();



            const startingIndex = (pageNumber*6)-6;
            const endingIndex = pageNumber*6;
            let response = data.slice(startingIndex, endingIndex);
            setSliceComplains(response);
            setComplains(data);

            setLoader(false);
        }

        fetchComplainsData();
    }, [])

    useEffect(() => {
        const startingIndex = (pageNumber*6)-6;
        const endingIndex = pageNumber*6;
        let response;
        (complains!==null) && (response = complains.slice(startingIndex, endingIndex));
        setSliceComplains(response);

    }, [pageNumber, complains]);

    const handleLeftButton = () => {
        setPageNumber(pageNumber-1);
    }

    const handleRightButton = () => {
        setPageNumber(pageNumber+1);
    }

    return (
        <section className='displayComplain-section'>
            {
                loggedInUser.userStatus!=="user" &&
                <div className='searchArea'>
                    <div className='filterHead'>
                        <TuneIcon />
                    </div>

                    <div>
                        <form className='inputField'>

                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">From</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={input?.monthFrom}
                                    name="monthFrom"
                                    label="From"
                                    onChange={handleInput}
                                >
                                    <MenuItem value={"January"}>January</MenuItem>
                                    <MenuItem value={"February"}>February</MenuItem>
                                    <MenuItem value={"March"}>March</MenuItem>
                                    <MenuItem value={"April"}>April</MenuItem>
                                    <MenuItem value={"May"}>May</MenuItem>
                                    <MenuItem value={"June"}>June</MenuItem>
                                    <MenuItem value={"July"}>July</MenuItem>
                                    <MenuItem value={"August"}>August</MenuItem>
                                    <MenuItem value={"September"}>September</MenuItem>
                                    <MenuItem value={"October"}>October</MenuItem>
                                    <MenuItem value={"November"}>November</MenuItem>
                                    <MenuItem value={"December"}>December</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">To</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={input?.monthTo}
                                    name="monthTo"
                                    label="To"
                                    onChange={handleInput}
                                >
                                    <MenuItem value={"January"}>January</MenuItem>
                                    <MenuItem value={"February"}>February</MenuItem>
                                    <MenuItem value={"March"}>March</MenuItem>
                                    <MenuItem value={"April"}>April</MenuItem>
                                    <MenuItem value={"May"}>May</MenuItem>
                                    <MenuItem value={"June"}>June</MenuItem>
                                    <MenuItem value={"July"}>July</MenuItem>
                                    <MenuItem value={"August"}>August</MenuItem>
                                    <MenuItem value={"September"}>September</MenuItem>
                                    <MenuItem value={"October"}>October</MenuItem>
                                    <MenuItem value={"November"}>November</MenuItem>
                                    <MenuItem value={"December"}>December</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">Year</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={input?.year}
                                    name="year"
                                    label="Year"
                                    onChange={handleInput}
                                >
                                    <MenuItem value={"2022"}>2022</MenuItem>
                                </Select>
                            </FormControl>

                            <button className='filterButton' onClick={handleFilters}>Search <SearchIcon /></button>
                        </form>
                    </div>
                </div>
            }


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