import React, { useEffect, useState } from 'react';
import "./EmergencyContact.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const EmergencyContactContent = () => {
    const [emergencyContactData, setEmergencyContactData] = useState(null);

    useEffect(() => {
        fetch('https://complain-box-server.vercel.app/emergencyContact')
        .then(response => response.json())
        .then(data => setEmergencyContactData(data));
    }, [])

    return (
        <div className='emergencyContact-body'>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650, width:"100%"}} aria-label="caption table">
                    <TableHead style={{backgroundColor: "orange"}}>
                        <TableRow>
                            <TableCell style={{color: "#fff", fontSize: "17px"}} align="center">Location</TableCell>
                            <TableCell style={{color: "#fff", fontSize: "17px"}} align="center">Emergency Contact</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            emergencyContactData?.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell style={{"textAlign": "center"}}>{row.location}</TableCell>
                                    <TableCell style={{"textAlign": "center"}}>Police Station: {row?.police} <br />Fire Station: {row?.fire} <br />Hospital: {row?.hospital}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default EmergencyContactContent;