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
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoader(true);

            const response = await fetch('https://complain-box-server.vercel.app/userData');
            const data = await response.json();
            setStaffListData(
                data.filter(staff => staff.userStatus!=="user")
            );

            setLoader(false);
        }

        fetchUserData();
    }, [])

    return (
        <div className='staffListForUser-body'>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650, width:"100%"}} aria-label="caption table">
                    <TableHead style={{backgroundColor: "orange"}}>
                        <TableRow>
                            <TableCell style={{color: "#fff", fontSize: "17px"}} align="center">Name</TableCell>
                            <TableCell style={{color: "#fff", fontSize: "17px"}} align="center">Contact</TableCell>
                            <TableCell style={{color: "#fff", fontSize: "17px"}} align="center">Address</TableCell>
                            <TableCell style={{color: "#fff", fontSize: "17px"}} align="center">Area</TableCell>
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