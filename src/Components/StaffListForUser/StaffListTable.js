import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StaffListTable = () => {
    const [staffListData, setStaffListData] = useState(null);

    useEffect(() => {
        fetch('https://whispering-mountain-24832.herokuapp.com/userData')
        .then(response => response.json())
        .then(data => setStaffListData(
            data.filter(staff => staff.userStatus!=="user")
        ));
    }, [])

    return (
        <div className='staffListForUser-body'>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650, margin: "100px", width:"85%"}} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Contact</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Area</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            staffListData?.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.userName} <br />{row.userStatus}</TableCell>
                                    <TableCell>{row.userEmail} <br /> {row.userPhone}</TableCell>
                                    <TableCell>{row.userAddress}</TableCell>
                                    {
                                        (row.userStatus==="admin") &&
                                        <TableCell>Has no specific area</TableCell>
                                    }
                                    {
                                        (row.userStatus==="Magistrate" || row.userStatus==="Mayor") && 
                                        <TableCell>Division: {row?.division} <br />District: {row?.district}</TableCell>
                                    }
                                    {
                                        (row.userStatus==="UNO") && 
                                        <TableCell>Division: {row?.division} <br />District: {row?.district} <br />Thana: {row?.thana}</TableCell>
                                    }
                                    {
                                        (row.userStatus==="Union Chairman") && 
                                        <TableCell>Division: {row?.division} <br />District: {row?.district} <br />Thana: {row?.thana} <br />Union: {row?.union}</TableCell>
                                    }
                                    {
                                        (row.userStatus==="Word Member") && 
                                        <TableCell>Division: {row?.division} <br />District: {row?.district} <br />Thana: {row?.thana} <br />Union: {row?.union} <br />Word No: {row?.word}</TableCell>
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default StaffListTable;