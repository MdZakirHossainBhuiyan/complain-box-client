import { Avatar, Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import '../List.css';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { UserContext } from '../../../App';

const ListCard = ({data}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [displayInputField, setDisplayInputField] = useState(false);
    const [userValue, setUserValue] = useState(data);

    const handleChange = (e) => {
        const newValue = {...userValue};
        newValue[e.target.name] = e.target.value;
        setUserValue(newValue);
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            alert('Deleted successfully');
        })
    }

    const handleUpdate = (id) => {
        (displayInputField)?setDisplayInputField(false):setDisplayInputField(true);
    }

    const handleUpdateSave = (id) => {
        fetch(`http://localhost:5000/staffAdminDataUpdate/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userValue)
        })
        .then(res => res.json())
        .then(data => {
            alert('Updated successfully');
        })
        setDisplayInputField(false);
    }

    return (
        <Card>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar sx={{margin: '10px'}}>
                        <BadgeOutlinedIcon />
                    </Avatar>
                    {
                        (!displayInputField) && 
                        <Typography component="div" variant="h5" sx={{color: 'orange'}}>
                            {userValue.userName}
                        </Typography>
                    }
                    {
                        displayInputField &&
                        <Typography>
                            <TextField onChange={handleChange} name="userName" id="standard-basic" value={userValue.userName} variant="standard" fullWidth />
                        </Typography>
                    }
                    <Typography sx={{color: 'gray'}}>
                        {data.userStatus}
                    </Typography>
                    {
                        (data.userStatus!=="admin") &&
                        <Typography sx={{color: 'gray', fontStyle: 'italic', fontSize: '12px'}}>
                            {data.district}, {data.division}
                        </Typography>
                    }
                </CardContent>
            </Box>
            <Box  sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        (!displayInputField) && 
                        <Typography sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            Phone: {data.userPhone}
                        </Typography>
                    }
                    {
                        (displayInputField) && 
                        <Typography sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TextField onChange={handleChange} name="userPhone" id="standard-basic" value={userValue.userPhone} variant="standard" fullWidth />
                        </Typography>
                    }
                    {
                        (!displayInputField) && 
                        <Typography sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} >
                            Address: {userValue.userAddress}
                        </Typography>
                    }
                    {
                        (displayInputField) && 
                        <Typography sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TextField onChange={handleChange} name="userAddress" id="standard-basic" value={userValue.userAddress} variant="standard" fullWidth />
                        </Typography>
                    }
                    {
                        (data.userStatus!=="admin") &&
                        <Typography sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}> <br /><br />
                            Dedicated Area:
                            {
                                data.userStatus==="Word Member" && 
                                <Typography sx={{color: 'gray', fontStyle: 'italic', fontSize: '12px'}}>
                                    Word No. {data.word}, Union: {data.union}, Thana: {data.thana}
                                </Typography>
                            }
                            {
                                data.userStatus==="Union Chairman" && 
                                <Typography sx={{color: 'gray', fontStyle: 'italic', fontSize: '12px'}}>
                                    Union: {data.union}, Thana: {data.thana}
                                </Typography>
                            }
                            {
                                data.userStatus==="UNO" && 
                                <Typography sx={{color: 'gray', fontStyle: 'italic', fontSize: '12px'}}>
                                    Thana: {data.thana}
                                </Typography>
                            }
                            {
                                (data.userStatus==="Magistrate" || data.userStatus==="Mayor") && 
                                <Typography sx={{color: 'gray', fontStyle: 'italic', fontSize: '12px'}}>
                                    Full District
                                </Typography>
                            }
                        </Typography>
                    }
                </CardContent>
            </Box>
            <Stack sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '15px'}} direction="row" spacing={2}>
                {
                    loggedInUser?.userStatus==="admin" && 
                    <Button onClick={() => handleDelete(data._id)} sx={{border: '1px solid #d3cfcf'}} variant="outlined">
                        <DeleteIcon sx={{color: 'gray'}} />
                    </Button>
                }
                {
                    (loggedInUser?.userStatus==="admin" && (!displayInputField))?
                    <Button onClick={() => handleUpdate(data._id)} sx={{border: '1px solid #d3cfcf'}} variant="outlined">
                        <UpdateIcon sx={{color: 'gray'}} />
                    </Button>
                    :
                    <Button onClick={() => handleUpdateSave(userValue._id)} sx={{border: '1px solid #d3cfcf'}} variant="outlined">
                        <UpdateIcon sx={{color: 'gray'}} />
                    </Button>
                }
                <Button sx={{border: '1px solid #d3cfcf'}} variant="outlined">
                    <SendIcon sx={{color: 'gray'}} />
                </Button>
            </Stack>
        </Card>
    );
};

export default ListCard;