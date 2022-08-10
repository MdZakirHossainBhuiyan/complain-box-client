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
        fetch('http://localhost:5000/emergencyContact')
        .then(response => response.json())
        .then(data => setEmergencyContactData(data));
    }, [])

    return (
        <div className='emergencyContact-body'>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650, margin: "100px", width:"85%"}} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Location</TableCell>
                        <TableCell align="center">Emergency Contact</TableCell>
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