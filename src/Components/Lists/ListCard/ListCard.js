import { Avatar, Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import '../List.css';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { UserContext } from '../../../App';

//import adminImage from '../../../image/display/adminImage.jpg';

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
        fetch(`https://complain-box-server.vercel.app/delete/${id}`, {
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
        fetch(`https://complain-box-server.vercel.app/staffAdminDataUpdate/${id}`, {
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
                    loggedInUser?.userStatus==="admin" &&
                    <div>
                        {
                            (!displayInputField)?
                            <Button onClick={() => handleUpdate(data._id)} sx={{border: '1px solid #d3cfcf'}} variant="outlined">
                                <UpdateIcon sx={{color: 'gray'}} />
                            </Button>
                            :
                            <Button onClick={() => handleUpdateSave(userValue._id)} sx={{border: '1px solid #d3cfcf'}} variant="outlined">
                                <UpdateIcon sx={{color: 'gray'}} />
                            </Button>
                        }
                    </div>
                }
                
                {/* <Button sx={{border: '1px solid #d3cfcf'}} variant="outlined">
                    <SendIcon sx={{color: 'gray'}} />
                </Button> */}
            </Stack>
        </Card>

        // <div className='card'>
        //     <div className='imgBox'>
        //         <img src={adminImage} alt="img" />
        //     </div>
        //     <div className='content'>
        //         <div className='details'>
        //             <h2>{userValue.userName}<br /><span>{userValue.userStatus}</span></h2>
        //             <div className='data'>
        //                 <h3>Phone: <span>{userValue.userPhone}</span></h3>
        //                 <h3>Address: <span>{userValue.userAddress}</span></h3>
        //             </div>
        //             <div className='actionButton'>
        //                 {
        //                     loggedInUser?.userStatus==="admin"?
        //                     <button>Delete <DeleteIcon style={{"marginLeft": "10px"}} /></button>
        //                     :
        //                     <button disabled>Delete <DeleteIcon style={{"marginLeft": "10px"}} /></button>
        //                 }
        //                 {
        //                     loggedInUser?.userStatus==="admin"?
        //                     <button>Update <UpdateIcon style={{"marginLeft": "10px"}} /></button>
        //                     :
        //                     <button disabled>Update <UpdateIcon style={{"marginLeft": "10px"}} /></button>
        //                 }
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default ListCard;