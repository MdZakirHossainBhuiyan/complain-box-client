import { CircularProgress } from '@mui/material';
import React from 'react';
import ListCard from '../ListCard/ListCard';

const StaffLists = ({staffData, loader}) => {
    return (
        <div className='list-div'>
           <div className='list-header'>
                <h5>Staff List</h5>
            </div>
            <div className='list-content'>
                {
                    (loader)?<CircularProgress></CircularProgress>:staffData?.map(data => <ListCard key={data._id} data={data} />)
                }
            </div>
        </div>
    );
};

export default StaffLists;