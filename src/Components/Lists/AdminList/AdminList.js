import { CircularProgress } from '@mui/material';
import React from 'react';
import '../List.css';
import ListCard from '../ListCard/ListCard';

const AdminList = ({adminData, loader}) => {
    return (
        <div className='list-div'>
            <div className='list-header'>
                <h5>Admin List</h5>
            </div>
            <div className='list-content'>
                {
                    (loader)?<CircularProgress></CircularProgress>:adminData?.map(data => <ListCard key={data._id} data={data} />)
                }
            </div>
        </div>
    );
};

export default AdminList;